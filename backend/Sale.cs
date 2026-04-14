public class Sale {
    public int saleID {get; set;}
    public int productID {get; set;}
    public int categoryID {get; set;}
    public double discountPercentage {get; set;}
    public DateTime startDate {get; set;}
    public DateTime endDate {get; set;}

    public Sale(int saleID, int productID, int categoryID, double discountPercentage, DateTime startDate, DateTime endDate) {
        this.saleID = saleID;
        this.productID = productID;
        this.categoryID = categoryID;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryID = categoryID;
    }
}