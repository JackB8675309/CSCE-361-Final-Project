public class Category{
    public int categoryID {get; set;}
    public string name {get; set;}
    public List<Product> products {get; set;}

    public Category(int categoryID, string name) {
        this.categoryID = categoryID;
        this.name = name;
        this.products = new List<Product>();
    }

    public void AddProduct(Product product) {
        products.Add(product);
    }

    public void RemoveProduct(Product product) {
        products.Remove(product);
    }
}