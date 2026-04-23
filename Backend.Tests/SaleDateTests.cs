using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests;

[TestFixture]
public class SaleDateTests {
    
    private ProductController _controller;

    [SetUp]
    public void Setup() {
        // Arrange
        _controller = new ProductController();
    }

    [Test]
    public void GetSaleDetails_CategoryWithActiveSale_ReturnsOkWithDates() {
        // Arrange
        int categoryId = 2;

        // Act
        var result = _controller.GetSaleDetails(categoryId) as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.StatusCode, Is.EqualTo(200));
        
        var data = result.Value;
        Assert.That(data, Is.Not.Null);
        var startDate = data.GetType().GetProperty("startDate")?.GetValue(data);
        var endDate = data.GetType().GetProperty("endDate")?.GetValue(data);
        Assert.That(startDate, Is.Not.Null);
        Assert.That(endDate, Is.Not.Null);
    }

    [Test]
    public void GetSaleDetails_CategoryWithoutSale_ReturnsNotFoundOrEmpty() {
        // Arrange
        int categoryId = 999; 

        // Act
        var result = _controller.GetSaleDetails(categoryId);

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundResult>().Or.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void GetSaleDetails_InvalidCategoryId_ReturnsError() {
        // Arrange
        int categoryId = -1;

        // Act
        var result = _controller.GetSaleDetails(categoryId);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>().Or.InstanceOf<NotFoundResult>());
    }
}

