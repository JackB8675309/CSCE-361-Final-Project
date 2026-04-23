using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Moq;

namespace Backend.Tests;

[TestFixture]
public class LogoutTests {
    
    private UserController _controller;
    private Mock<ISession> _sessionMock;

    [SetUp]
    public void Setup() {
        _sessionMock = new Mock<ISession>();
        var httpContext = new DefaultHttpContext();
        httpContext.Session = _sessionMock.Object;

        _controller = new UserController {
            ControllerContext = new ControllerContext {
                HttpContext = httpContext
            }
        };
    }

    [Test]
    public void Logout_ReturnsOkResult() {
        // Act
        var result = _controller.Logout();

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void Logout_ReturnsSuccessMessage() {
        // Act
        var result = _controller.Logout() as OkObjectResult;
        
        // Assert
        Assert.That(result, Is.Not.Null);
        var data = result.Value;
        var message = data?.GetType().GetProperty("message")?.GetValue(data);
        Assert.That(message, Is.EqualTo("Logged out successfully"));
    }
}
