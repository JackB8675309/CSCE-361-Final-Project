/*
* Model that represents the items in a shopping cart.
*/
public class CartItem {
    public int productID { get; set; }
    public string sku { get; set; }
    public string name { get; set; }
    public double price { get; set; }
    public string image { get; set; }
    public int quantity { get; set; }
}