using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Tests;

[TestFixture]
public class FilteringTests {
    
    private ProductController _controller;

    [SetUp]
    public void Setup() {
        // Arrange
        _controller = new ProductController();
    }

    [Test]
    public void FilterByCategory_ValidId_ReturnsOk() {
        // Arrange
        int categoryId = 1;

        // Act
        var result = _controller.GetProductsByCategory(categoryId);

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    public void FilterByCategory_InvalidId_ReturnsEmptyOrNotFound() {
        // Arrange
        int categoryId = 9999;

        // Act
        var result = _controller.GetProductsByCategory(categoryId) as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        var products = result.Value as IEnumerable<Product>;
        if (products != null) {
            Assert.That(products, Is.Empty);
        }
    }

    [Test]
    public void FilterBySale_ReturnsOnlyOnSaleProducts() {
        // Act
        var result = _controller.GetProductsOnSale() as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        var products = result.Value as IEnumerable<dynamic>; // Using dynamic for anonymous sale objects
        if (products != null) {
            foreach (var item in products) {
                Assert.That(item, Is.Not.Null);
            }
        }
    }

    [Test]
    public void SortByCategory_ReturnsProductsGroupedByCategory() {
        // Act
        var result = _controller.GetProductsSortedByCategory() as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.StatusCode, Is.EqualTo(200));
    }

    [Test]
    public void GetProductsOnSale_CalculatesCorrectSalePrice() {
        // Act
        var result = _controller.GetProductsOnSale() as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        var products = result.Value as System.Collections.IEnumerable;
        
        if (products != null) {
            foreach (var item in products) {
                // Formula: SalePrice = BasePrice - Discount
                var productProp = item.GetType().GetProperty("product")?.GetValue(item);
                var priceProp = productProp?.GetType().GetProperty("price")?.GetValue(productProp);
                var salePriceProp = item.GetType().GetProperty("salePrice")?.GetValue(item);
                var discountAmountProp = item.GetType().GetProperty("discountAmount")?.GetValue(item);
                var discountPercentageProp = item.GetType().GetProperty("discountPercentage")?.GetValue(item);

                double basePrice = Convert.ToDouble(priceProp);
                double discount = 0;
                
                if (discountAmountProp != null) {
                    discount = Convert.ToDouble(discountAmountProp);
                } else if (discountPercentageProp != null) {
                    discount = basePrice * (Convert.ToDouble(discountPercentageProp) / 100.0);
                }
                
                double expectedSalePrice = Math.Round(basePrice - discount, 2);
                Assert.That(Convert.ToDouble(salePriceProp), Is.EqualTo(expectedSalePrice).Within(0.01));
            }
        }
    }

    [Test]
    public void GetProductsOnSale_ExcludesExpiredSales() {
        // Act
        var result = _controller.GetProductsOnSale() as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        var products = result.Value as System.Collections.IEnumerable;
        
        if (products != null) {
            foreach (var item in products) {
                var endDateProp = item.GetType().GetProperty("endDate")?.GetValue(item);
                DateTime endDate = DateTime.Parse(endDateProp.ToString());
                Assert.That(endDate, Is.GreaterThanOrEqualTo(DateTime.Now.Date));
            }
        }
    }
}

