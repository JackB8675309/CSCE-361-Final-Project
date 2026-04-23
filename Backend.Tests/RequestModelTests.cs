using NUnit.Framework;
using System.Collections.Generic;

namespace Backend.Tests;

[TestFixture]
public class RequestModelTests {
    [Test]
    public void AuthRequest_Properties_WorkCorrectly() {
        // Arrange & Act
        var request = new AuthRequest {
            Email = "test@example.com",
            Password = "password123"
        };

        // Assert
        Assert.That(request.Email, Is.EqualTo("test@example.com"));
        Assert.That(request.Password, Is.EqualTo("password123"));
    }

    [Test]
    public void CheckoutRequest_Properties_WorkCorrectly() {
        // Arrange & Act
        var request = new CheckoutRequest {
            ShippingDetails = "123 Main St",
            PaymentDetails = "Card 1234"
        };

        // Assert
        Assert.That(request.ShippingDetails, Is.EqualTo("123 Main St"));
        Assert.That(request.PaymentDetails, Is.EqualTo("Card 1234"));
    }
}
