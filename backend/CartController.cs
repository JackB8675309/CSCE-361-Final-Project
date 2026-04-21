using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

public class CartItemDto {
    public int productID { get; set; }
    public string sku { get; set; }
    public string name { get; set; }
    public double price { get; set; }
    public string image { get; set; }
    public int quantity { get; set; }
}

public class CartRequest {
    public int userId { get; set; }
    public int productId { get; set; }
    public int quantity { get; set; }
}

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase {

    [HttpGet("{userId}")]
    public ActionResult GetCart(int userId) {
        List<CartItemDto> items = new List<CartItemDto>();
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                string query = @"
                    SELECT c.productID, c.quantity, p.sku, p.name, p.price, p.imageUrl,
                      (SELECT TOP 1 discountAmount FROM Sale s WHERE (s.productID = p.productID OR s.categoryID = p.categoryID) AND s.startDate <= GETDATE() AND s.endDate >= GETDATE() ORDER BY discountAmount DESC) as discount
                    FROM cart c
                    JOIN product p ON c.productID = p.productID
                    WHERE c.userID = @userId";

                using (SqlCommand command = new SqlCommand(query, conn)) {
                    command.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = userId;
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        while (reader.Read()) {
                            double itemPrice = Convert.ToDouble(reader["price"]);
                            object discountObj = reader["discount"];
                            if (discountObj != DBNull.Value && discountObj != null) {
                                double discount = Convert.ToDouble(discountObj);
                                if (discount > 0 && discount < itemPrice) {
                                    itemPrice -= discount;
                                }
                            }
                            
                            items.Add(new CartItemDto {
                                productID = Convert.ToInt32(reader["productID"]),
                                quantity = Convert.ToInt32(reader["quantity"]),
                                sku = reader["sku"].ToString(),
                                name = reader["name"].ToString(),
                                price = Math.Round(itemPrice, 2),
                                image = reader["imageUrl"].ToString()
                            });
                        }
                    }
                }
            }
            return Ok(items);
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    [HttpPost("update")]
    public ActionResult UpdateCartRow([FromBody] CartRequest request) {
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                
                string checkQuery = "SELECT quantity FROM cart WHERE userID = @userId AND productID = @productId";
                using (SqlCommand checkCmd = new SqlCommand(checkQuery, conn)) {
                    checkCmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = request.userId;
                    checkCmd.Parameters.Add("@productId", System.Data.SqlDbType.Int).Value = request.productId;
                    object result = checkCmd.ExecuteScalar();

                    if (result != null) {
                        // Exists, update it
                        if (request.quantity > 0) {
                            string updateQuery = "UPDATE cart SET quantity = @qty WHERE userID = @userId AND productID = @productId";
                            using (SqlCommand updateCmd = new SqlCommand(updateQuery, conn)) {
                                updateCmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = request.userId;
                                updateCmd.Parameters.Add("@productId", System.Data.SqlDbType.Int).Value = request.productId;
                                updateCmd.Parameters.Add("@qty", System.Data.SqlDbType.Int).Value = request.quantity;
                                updateCmd.ExecuteNonQuery();
                            }
                        } else {
                            // If quantity is 0, remove it from DB
                            string deleteQuery = "DELETE FROM cart WHERE userID = @userId AND productID = @productId";
                            using (SqlCommand delCmd = new SqlCommand(deleteQuery, conn)) {
                                delCmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = request.userId;
                                delCmd.Parameters.Add("@productId", System.Data.SqlDbType.Int).Value = request.productId;
                                delCmd.ExecuteNonQuery();
                            }
                        }
                    } else {
                        // Does not exist, insert it
                        if (request.quantity > 0) {
                            string insertQuery = "INSERT INTO cart (userID, productID, quantity) VALUES (@userId, @productId, @qty)";
                            using (SqlCommand insertCmd = new SqlCommand(insertQuery, conn)) {
                                insertCmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = request.userId;
                                insertCmd.Parameters.Add("@productId", System.Data.SqlDbType.Int).Value = request.productId;
                                insertCmd.Parameters.Add("@qty", System.Data.SqlDbType.Int).Value = request.quantity;
                                insertCmd.ExecuteNonQuery();
                            }
                        }
                    }
                }
            }
            return Ok(new { message = "Cart updated successfully" });
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }

    [HttpDelete("clear/{userId}")]
    public ActionResult ClearCart(int userId) {
        try {
            using (DatabaseConnection database = new DatabaseConnection()) {
                SqlConnection conn = database.OpenConnection();
                string deleteQuery = "DELETE FROM cart WHERE userID = @userId";
                using (SqlCommand delCmd = new SqlCommand(deleteQuery, conn)) {
                    delCmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = userId;
                    delCmd.ExecuteNonQuery();
                }
            }
            return Ok(new { message = "Cart cleared successfully" });
        } catch (SqlException e) {
            return BadRequest(new { message = "Database error", error = e.Message });
        }
    }
}
