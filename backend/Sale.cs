public class Sale {
    private int saleID {get; set;}
    private int productID {get; set;}
    private int categoryID {get; set;}
    private double discountPercentage {get; set;}
    private DateTime startDate {get; set;}
    private DateTime endDate {get; set;}

    public Sale(int saleID, int productID, double discountPercentage, DateTime startDate, DateTime endDate) {
        this.saleID = saleID;
        this.productID = productID;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryID = categoryID;
    }
}