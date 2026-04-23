using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Tests;

[TestFixture]
public class SortingTests {
    
    private ProductController _controller;

    [SetUp]
    public void Setup() {
        // Arrange
        _controller = new ProductController();
    }

    [Test]
    public void SortByCategory_ReturnsOkWithProducts() {
        // Act
        var result = _controller.GetProductsSortedByCategory() as OkObjectResult;

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.StatusCode, Is.EqualTo(200));
    }

    [Test]
    public void SortByCategory_IsActuallyOrdered() {
        // Arrange & Act
        var result = _controller.GetProductsSortedByCategory() as OkObjectResult;
        
        // Assert
        Assert.That(result, Is.Not.Null);
        var products = result.Value as IEnumerable<Product>;
        
        if (products != null && products.Any()) {
            var originalList = products.ToList();
            var sortedList = originalList.OrderBy(p => p.details?.categoryID).ToList();
            
            
            Assert.That(originalList, Is.EqualTo(sortedList));
        }
    }
}

