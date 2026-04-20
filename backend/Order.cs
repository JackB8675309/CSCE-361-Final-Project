using System;
using System.Collections.Generic;
using System.Data.SqlClient;

public class Order {
    public int orderID {get; set;}
    public int userID {get; set;}
    public List<Product> products {get; set;}
    public double total {get; set;}
    public int quantity {get; set;}
    public DateTime orderDate {get; set;}
    public string shippingDetails {get; set;}
    public string paymentDetails {get; set;}

    public Order(int orderID, int userID, List<Product> products, double total, int quantity, DateTime orderDate, string shippingDetails, string paymentDetails) {
        this.orderID = orderID;
        this.userID = userID;
        this.products = products;
        this.total = total;
        this.quantity = quantity;
        this.orderDate = orderDate;
        this.shippingDetails = shippingDetails;
        this.paymentDetails = paymentDetails;
    }

    public void placeOrder(){
        using (DatabaseConnection database = new DatabaseConnection()){
            SqlConnection conn = database.OpenConnection();
            try {
                string orderQuery = "INSERT INTO Orders (userID, total, orderDate, shippingDetails) OUTPUT INSERTED.orderID VALUES (@userID, @total, @orderDate, @shippingDetails)";
            using (SqlCommand command = new SqlCommand(orderQuery, conn)){
                command.Parameters.AddWithValue("@userID", this.userID);
                command.Parameters.AddWithValue("@total", this.total);
                command.Parameters.AddWithValue("@orderDate", this.orderDate);
                command.Parameters.AddWithValue("@shippingDetails", this.shippingDetails);
                this.orderID = (int)command.ExecuteScalar();
            }

            foreach (Product product in this.products){
                string itemQuery = "INSERT INTO OrderItems (orderID, productID, quantity, price) VALUES (@orderID, @productID, @quantity, @price)";
                using (SqlCommand command = new SqlCommand(itemQuery, conn)){
                    command.Parameters.AddWithValue("@orderID", this.orderID);
                    command.Parameters.AddWithValue("@productID", product.productID);
                    command.Parameters.AddWithValue("@quantity", 1);
                    command.Parameters.AddWithValue("@price", product.price);
                    command.ExecuteNonQuery();
                }
            }
                }
            } catch (SqlException e) {
                Console.WriteLine(e.Message);
            }

        }

    }

}
