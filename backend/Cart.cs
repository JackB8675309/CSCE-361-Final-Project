public class Cart {
    public int cartID {get; set;}
    public int userID {get; set;}
    public List<Product> products {get; set;}
    public double total {get; set;}
    public int quantity {get; set;}

    public Cart(int cartID, int userID) {
        this.cartID = cartID;
        this.userID = userID;
        this.products = new List<Product>();
        this.total = 0;
    }

    public void AddItem(Product product) {
        products.Add(product);
        total += product.price;
        quantity++;
    }

    public void RemoveItem(Product product) {
        products.Remove(product);
        total -= product.price;
        quantity--;
    }
}