using NUnit.Framework;

namespace Backend.Tests;

[TestFixture]
public class UserTests {
    [Test]
    public void User_Constructor_SetsPropertiesCorrectly() {
        // Arrange
        int testId = 1;
        string testEmail = "test@example.com";
        string testPassword = "password123";

        // Act
        var user = new Users(testId, testEmail, testPassword);

        // Assert
        Assert.That(user.userID, Is.EqualTo(testId));
        Assert.That(user.email, Is.EqualTo(testEmail));
        Assert.That(user.password, Is.EqualTo(testPassword));
    }

    [Test]
    public void User_Setters_UpdateProperties() {
        // Arrange
        var user = new Users(1, "old@example.com", "oldPass");

        // Act
        user.email = "new@example.com";
        user.password = "newPass";

        // Assert
        Assert.That(user.email, Is.EqualTo("new@example.com"));
        Assert.That(user.password, Is.EqualTo("newPass"));
    }
}
