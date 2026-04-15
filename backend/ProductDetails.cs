public class ProductDetails {
    public string Description {get; set;}
    public double weight {get; set;}
    public string dimensions {get; set;}
    public string manufactuer {get; set;}
    public double rating {get; set;}
    public string sku {get; set;}
    public int categoryID {get; set;}
    public string imageUrl {get; set;}

    public ProductDetails(string description, double weight, string dimensions, string manufactuer, double rating, string sku, int categoryID, string imageUrl) {
        this.Description = description;
        this.weight = weight;
        this.dimensions = dimensions;
        this.manufactuer = manufactuer;
        this.rating = rating;
        this.sku = sku;
        this.categoryID = categoryID;
        this.imageUrl = imageUrl;
    }
}