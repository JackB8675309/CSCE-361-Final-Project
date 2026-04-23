using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests;

[TestFixture]
public class UserControllerTests {
    
    private UserController _controller;

    [SetUp]
    public void Setup() {
        _controller = new UserController();
    }

    [Test]
    public void Login_EmptyRequest_ReturnsBadRequest() {
        // Arrange
        var request = new AuthRequest { Email = "", Password = "" };

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void CreateAccount_ValidRequest_ReturnsOk() {
        // Arrange
        var request = new AuthRequest { 
            Email = "newuser@example.com", 
            Password = "Password123!" 
        };

        // Act
        var result = _controller.CreateAccount(request);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void CreateAccount_NullEmail_ReturnsBadRequest() {
        // Arrange
        var request = new AuthRequest { Email = null, Password = "SomePassword" };

        // Act
        var result = _controller.CreateAccount(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void CreateAccount_EmptyPassword_ReturnsBadRequest() {
        // Arrange
        var request = new AuthRequest { Email = "test@example.com", Password = "" };

        // Act
        var result = _controller.CreateAccount(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void CreateAccount_EmailTooLong_ReturnsBadRequest() {
        // Arrange
        var longEmail = new string('A', 256) + "@example.com";
        var request = new AuthRequest { Email = longEmail, Password = "ValidPassword123" };

        // Act
        var result = _controller.CreateAccount(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }
    
    [Test]
    public void Login_SqlInjectionInput_ReturnsUnauthorized() {
        // Arrange
        var request = new AuthRequest { 
            Email = "admin' --", 
            Password = "' OR '1'='1" 
        };

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }
}
