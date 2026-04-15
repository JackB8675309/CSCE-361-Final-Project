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
        
    }

}
