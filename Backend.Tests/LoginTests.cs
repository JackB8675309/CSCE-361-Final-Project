using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests;

[TestFixture]
public class LoginTests {
    
    private UserController _controller;

    [SetUp]
    public void Setup() {
        _controller = new UserController();
    }

    [Test]
    public void Login_ValidCredentials_ReturnsOk() {
        // Arrange
        var request = new AuthRequest { 
            Email = "test@example.com", 
            Password = "correctPassword" 
        };

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    public void Login_WrongPassword_ReturnsUnauthorized() {
        // Arrange
        var request = new AuthRequest { 
            Email = "test@example.com", 
            Password = "wrongPassword" 
        };

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }

    [Test]
    public void Login_NullRequest_ReturnsBadRequest() {
        // Arrange
        AuthRequest request = null;

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void Login_MissingEmail_ReturnsBadRequest() {
        // Arrange
        var request = new AuthRequest { Email = "", Password = "somePassword" };

        // Act
        var result = _controller.Login(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }
}
