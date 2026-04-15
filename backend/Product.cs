public class Product {
    public int productID {get; set;}
    public string name {get; set;}
    public double price {get; set;}
    public ProductDetails details {get; set;}

    public Product(int productID, string name, double price, ProductDetails details) {
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.details = details;
    }
    
}

