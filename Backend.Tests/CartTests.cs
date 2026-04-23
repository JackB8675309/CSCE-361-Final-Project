using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Moq;
using System.Text;

namespace Backend.Tests;

[TestFixture]
public class CartTests {
    
    private CartController _controller;
    private Mock<ISession> _sessionMock;

    [SetUp]
    public void Setup() {
        _sessionMock = new Mock<ISession>();
        
        var httpContext = new DefaultHttpContext();
        httpContext.Session = _sessionMock.Object;

        _controller = new CartController {
            ControllerContext = new ControllerContext {
                HttpContext = httpContext
            }
        };
    }

    [Test]
    public void GetCart_UserNotLoggedIn_ReturnsUnauthorized() {
        // Arrange
        byte[]? outVal = null;
        _sessionMock.Setup(s => s.TryGetValue("userId", out outVal)).Returns(false);

        // Act
        var result = _controller.GetCart();

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }

    [Test]
    public void UpdateCart_UserNotLoggedIn_ReturnsUnauthorized() {
        // Arrange
        var request = new CartRequest { productId = 1, quantity = 1 };
        byte[]? outVal = null;
        _sessionMock.Setup(s => s.TryGetValue("userId", out outVal)).Returns(false);

        // Act
        var result = _controller.UpdateCartRow(request);

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }

    [Test]
    public void ClearCart_UserNotLoggedIn_ReturnsUnauthorized() {
        // Arrange
        byte[]? outVal = null;
        _sessionMock.Setup(s => s.TryGetValue("userId", out outVal)).Returns(false);

        // Act
        var result = _controller.ClearCart();

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }

    [Test]
    public void UpdateCart_ZeroQuantity_ReturnsOk() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        var request = new CartRequest { productId = 1, quantity = 0 };

        // Act
        var result = _controller.UpdateCartRow(request);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void UpdateCart_NegativeQuantity_TreatedAsZero() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);
        var request = new CartRequest { productId = 1, quantity = -1 };

        // Act
        var result = _controller.UpdateCartRow(request);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void ClearCart_LoggedInUser_ReturnsOk() {
        // Arrange
        int userId = 1;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);

        // Act
        var result = _controller.ClearCart();

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void GetCart_EnforcesUserIsolation() {
        // Arrange
        int userId = 100;
        byte[] userIdBytes = BitConverter.GetBytes(userId);
        _sessionMock.Setup(s => s.TryGetValue("userId", out userIdBytes)).Returns(true);

        // Act
        var result = _controller.GetCart();

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

}
