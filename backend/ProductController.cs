using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase {

    // Helper to build a Product object from a SqlDataReader row
    private Product BuildProduct(SqlDataReader reader) {
        ProductDetails details = new ProductDetails(
            reader["description"].ToString(),
            Convert.ToDouble(reader["weight"]),
            reader["dimensions"].ToString(),
            reader["manufacturer"].ToString(),
            Convert.ToDouble(reader["rating"]),
            reader["sku"].ToString(),
            Convert.ToInt32(reader["categoryID"]),
            reader["imageUrl"].ToString()
        );
        return new Product(
            Convert.ToInt32(reader["productID"]),
            reader["name"].ToString(),
            Convert.ToDouble(reader["price"]),
            details
        );
    }

    // GET /product/category/{categoryID}
    [HttpGet("category/{categoryID}")]
    public ActionResult GetProductsByCategory(int categoryID) {
        List<Product> products = new List<Product>();
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                string query = "SELECT * FROM product WHERE categoryID = @categoryID";
                using (SqlCommand command = new SqlCommand(query, conn)) {
                    command.Parameters.Add("@categoryID", System.Data.SqlDbType.Int).Value = categoryID;
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            products.Add(BuildProduct(reader));
                        }
                    }
                }
            }
            return Ok(products);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    // GET /product/sortByCategory
    [HttpGet("sortByCategory")]
    public ActionResult GetProductsSortedByCategory() {
        List<Product> products = new List<Product>();
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                // Join with category so we can sort by category name, then product name
                string query = @"
                    SELECT p.*, c.name AS categoryName
                    FROM product p
                    JOIN category c ON p.categoryID = c.categoryID
                    ORDER BY c.name, p.name";
                using (SqlCommand command = new SqlCommand(query, conn)) {
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            products.Add(BuildProduct(reader));
                        }
                    }
                }
            }
            return Ok(products);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    // GET /product/onSale
    [HttpGet("onSale")]
    public ActionResult GetProductsOnSale() {
        List<object> saleProducts = new List<object>();
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                // Get products on sale either by productID or by categoryID, active sales only
                string query = @"
                    SELECT p.*, s.saleID, s.discountAmount, s.discountPercentage, s.startDate, s.endDate
                    FROM product p
                    JOIN Sale s ON (s.productID = p.productID OR s.categoryID = p.categoryID)
                    WHERE s.startDate <= GETDATE() AND s.endDate >= GETDATE()
                    ORDER BY COALESCE(s.discountAmount, p.price * (s.discountPercentage / 100.0)) DESC";
                using (SqlCommand command = new SqlCommand(query, conn)) {
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            Product product = BuildProduct(reader);
                            double discount = 0;
                            if (reader["discountAmount"] != DBNull.Value) {
                                discount = Convert.ToDouble(reader["discountAmount"]);
                            } else if (reader["discountPercentage"] != DBNull.Value) {
                                discount = product.price * (Convert.ToDouble(reader["discountPercentage"]) / 100.0);
                            }
                            double salePrice = product.price - discount;

                            saleProducts.Add(new {
                                product = product,
                                saleID = Convert.ToInt32(reader["saleID"]),
                                discountAmount = Math.Round(discount, 2),
                                salePrice = Math.Round(salePrice, 2),
                                startDate = reader["startDate"].ToString(),
                                endDate = reader["endDate"].ToString()
                            });
                        }
                    }
                }
            }
            return Ok(saleProducts);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    [HttpGet("search")]
    public ActionResult SearchProducts([FromQuery] string q) {
        List<Product> products = new List<Product>();
        if (string.IsNullOrWhiteSpace(q)) {
            return Ok(products);
        }

        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                string query = "SELECT * FROM product WHERE name LIKE @query OR description LIKE @query";
                using (SqlCommand command = new SqlCommand(query, conn)) {
                    command.Parameters.Add("@query", System.Data.SqlDbType.NVarChar).Value = "%" + q + "%";
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            products.Add(BuildProduct(reader));
                        }
                    }
                }
            }
            return Ok(products);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    // GET /product/categories
    [HttpGet("categories")]
    public ActionResult GetCategories() {
        List<object> categories = new List<object>();
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                string query = "SELECT * FROM category";
                using (SqlCommand command = new SqlCommand(query, conn)) {
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            categories.Add(new {
                                categoryID = Convert.ToInt32(reader["categoryID"]),
                                name = reader["name"].ToString()
                            });
                        }
                    }
                }
            }
            return Ok(categories);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }
}
