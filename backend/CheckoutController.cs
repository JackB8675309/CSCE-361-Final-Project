using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.SqlClient;

[ApiController]
[Route("[controller]")]

public class CheckoutController : ControllerBase {
    [HttpPost]
    public ActionResult Checkout([FromBody] CheckoutRequest request) {
        try {
            Cart userCart = RetrieveCartForUser(request.UserId);
            if (userCart == null || userCart.products.Count == 0) {
                return BadRequest("Cart Is Empty.");
            }

            Order newOrder = userCart.Checkout(request.ShippingDetails, request.PaymentDetails);
            ClearUserCartInDatabase(userCart.cartID);

            return RedirectToAction("OrderConfirmation", "Order", new { orderId = newOrder.orderID });
        } catch (Exception e) {
            ModelState.AddModelError("", "An error occurred: " + e.Message);
            return View("Index", request);
        }
    }

    [HttpGet]
    public ActionResult Confirmation(int orderId){
        ViewBag.OrderId = orderId;
        return View();
    }

    /*
    * The idea and general format for this class was designed through a prompt using Gemini 3.1 and Google's Anti-Gravity
    * No code was copied directly from the LLM, but it was rephrased and tweaked to match the needed design
    * The prompt was "How would I design a helper class to retrieve the cart for a user so that I do not have to build 
    * it into the main checkout controller function?"
    */

    private Cart RetrieveCartForUser(int userId) {

        Cart cart = new Cart(0, userId);
        using (DatabaseConnection database = new DatabaseConnection()){
            SqlConnection conn = database.OpenConnection();
            string query = @"SELECT c.quantity, p.productID, p.name, p.price, p.description, p.weight, p.dimensions, p.manufacturer, p.rating, p.sku, p.categoryID, p.imageUrl FROM cart c JOIN product p ON c.productID = p.productID WHERE c.userID = @userID";
            using (SqlCommand command = new SqlCommand(query, conn)){
                command.Parameters.AddWithValue("@userID", userId);
                using (SqlCommand command = new SqlCommand(query, conn)){
                    command.Parameters.AddWithValue("@userID, userId");
                    using (SqlDataReader reader = ccommand.ExecuteReader()){
                        while(reader.Read()){
                            string description = reader.GetString(reader.GetOrdinal("description"));
                            double weight = Convert.ToDouble(reader["weight"]);
                            string dimensions = reader.GetString(reader.GetOrdinal("dimensions"));
                            string manufacturer = reader.GetString(reader.GetOrdinal("manufacturer"));
                            double rating = Convert.ToDouble(reader["rating"]);
                            string sku = reader.GetString(reader.GetOrdinal("sku"));
                            int categoryID = Convert.ToInt32(reader["categoryID"]);
                            string imageUrl = reader.GetString(reader.GetOrdinal("imageUrl"));

                            ProductDetails details = new ProductDetails(description, weight, dimensions, manufacturer, rating, sku, categoryID, imageUrl);
                            int productID = Convert.ToInt32(reader["productID"]);
                            string name = reader.GetString(reader.GetOrdinal("name"));
                            double price = Convert.ToDouble(reader["price"]);

                            Product product = new Product(productID, name, price, details);
                            int quantity = Convert.ToInt32(reader["quantity"]);
                            for (int i = 0; i < quantity; i++){
                                cart.AddItem(product);
                            }
                        }
                    }
                }
            }
            return cart;
        }
        
    }

    private void ClearUserCartInDatabase(int userId){
        using (DatabaseConnection database = new DatabaseConnection()){
            SqlConnection connection = database.OpenConnection();
            string query = "DELETE FROM cart WHERE userID = @userID";
            using (SqlCommand command = new SqlCommand(query, conn)){
                command.Parameters.AddWithValue("@userID", userId);
                command.ExecuteNonQuery();
            }
        }
    }
}