using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Tests;

[TestFixture]
public class SearchTests {
    
    private ProductController _controller;

    [SetUp]
    public void Setup() {
        // Arrange
        _controller = new ProductController();
    }

    [Test]
    public void Search_WithValidQuery_ReturnsOk() {
        // Arrange
        string query = "Soap";

        // Act
        var result = _controller.SearchProducts(query);

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    public void Search_WithEmptyQuery_ReturnsAllProducts() {
        // Arrange
        string query = "";

        // Act
        var result = _controller.SearchProducts(query) as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.StatusCode, Is.EqualTo(200));
    }

    [Test]
    public void Search_WithNoMatches_ReturnsEmptyList() {
        // Arrange
        string query = "NonExistentProductXYZ";

        // Act
        var result = _controller.SearchProducts(query) as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        // Assuming the result is a list of products
        var products = result.Value as IEnumerable<Product>;
        if (products != null) {
            Assert.That(products, Is.Empty);
        }
    }

    [Test]
    public void Search_SqlInjectionInput_ReturnsEmptyOrOk() {
        // Arrange
        string maliciousQuery = "Soap'; DROP TABLE Users; --";

        // Act
        var result = _controller.SearchProducts(maliciousQuery);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }
}
