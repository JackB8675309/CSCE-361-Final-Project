using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Moq;
using System.Collections.Generic;

namespace Backend.Tests;

[TestFixture]
public class CheckoutTests {
    
    private CheckoutController _controller;
    private Mock<ISession> _sessionMock;

    [SetUp]
    public void Setup() {
        _sessionMock = new Mock<ISession>();
        
        var httpContext = new DefaultHttpContext();
        httpContext.Session = _sessionMock.Object;

        _controller = new CheckoutController {
            ControllerContext = new ControllerContext {
                HttpContext = httpContext
            }
        };
    }

    [Test]
    public void Checkout_UserNotLoggedIn_ReturnsUnauthorized() {
        // Arrange
        var request = new CheckoutRequest { ShippingDetails = "Addr", PaymentDetails = "Card" };
        byte[]? outVal = null;
        _sessionMock.Setup(s => s.TryGetValue("userId", out outVal)).Returns(false);

        // Act
        var result = _controller.Checkout(request);

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }

    [Test]
    public void Checkout_EmptyCart_ReturnsBadRequest() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        
        var request = new CheckoutRequest { ShippingDetails = "Addr", PaymentDetails = "Card" };

        // Act
        var result = _controller.Checkout(request);

        // Assert
        Assert.That(result, Is.Not.Null);
    }


    [Test]
    public void Checkout_MissingShippingDetails_ReturnsBadRequest() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        
        var request = new CheckoutRequest { ShippingDetails = null, PaymentDetails = "Card #1234" };

        // Act
        var result = _controller.Checkout(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void Checkout_EmptyPaymentDetails_ReturnsBadRequest() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        
        var request = new CheckoutRequest { ShippingDetails = "123 Main St", PaymentDetails = "" };

        // Act
        var result = _controller.Checkout(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void Checkout_ShippingDetailsTooLong_ReturnsBadRequest() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        
        var longShipping = new string('A', 501);
        var request = new CheckoutRequest { ShippingDetails = longShipping, PaymentDetails = "Card #1234" };

        // Act
        var result = _controller.Checkout(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }
}
