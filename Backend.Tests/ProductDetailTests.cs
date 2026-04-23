using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests;

[TestFixture]
public class ProductDetailTests {
    
    private ProductController _controller;

    [SetUp]
    public void Setup() {
        // Arrange
        _controller = new ProductController();
    }

    [Test]
    public void GetProductById_ValidId_ReturnsOkWithProduct() {
        // Arrange
        int productId = 1;

        // Act
        var result = _controller.GetProductById(productId) as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.StatusCode, Is.EqualTo(200));
        
        var product = result.Value as Product;
        if (product != null) {
            Assert.That(product.productID, Is.EqualTo(productId));
            Assert.That(product.name, Is.Not.Null);
            Assert.That(product.details, Is.Not.Null);
            Assert.That(product.details.sku, Is.Not.Null);
            Assert.That(product.details.rating, Is.GreaterThanOrEqualTo(0));
        }
    }

    [Test]
    public void GetProductById_InvalidId_ReturnsNotFound() {
        // Arrange
        int productId = -1;

        // Act
        var result = _controller.GetProductById(productId);

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public void GetProductById_NonExistentId_ReturnsNotFound() {
        // Arrange
        int productId = 99999;

        // Act
        var result = _controller.GetProductById(productId);

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }
}
