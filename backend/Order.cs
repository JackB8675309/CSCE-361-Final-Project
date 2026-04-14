public class Order {
    private int orderID {get; set;}
    private int userID {get; set;}
    private List<Product> products {get; set;}
    private double total {get; set;}
    private int quantity {get; set;}
    private DateTime orderDate {get; set;}
    private string shippingDetails {get; set;}
    private string paymentDetails {get; set;}

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
