using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("[controller]")]
/*
 * Information for this class's design was sourced from:
 * https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-10.0
 * https://learn.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/parameter-binding-in-aspnet-web-api
 * The template set up provided in the source was used as a template for this class
 */
public class UserController : ControllerBase {
    [HttpPost("login")]
    public ActionResult Login([FromBody] AuthRequest request) {
        if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password)) {
            return BadRequest(new { message = "Email and Password are required." });
        }

        Users userModel = new Users(0, "", "");
        bool loginSuccess = userModel.login(request.Email, request.Password);
        if (loginSuccess){
            HttpContext.Session.SetInt32("userId", userModel.userID);
            return Ok(new { message = "Login successful", userId = userModel.userID, email = userModel.email });
        } else {
            return Unauthorized(new { message = "That username or password was incorrect" });
        }
    }

    [HttpPost("logout")]
    public ActionResult Logout(){
        HttpContext.Session.Clear();
        return Ok(new { message = "Logged out successfully"});
    }
    
    [HttpPost("create-account")]
    public ActionResult CreateAccount([FromBody] AuthRequest request){
        if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password) ||
            request.Email.Length > 255 || request.Password.Length > 255) {
            return BadRequest(new { message = "Email and Password are required and must be under 255 characters." });
        }

        try {
            Users userModel = new Users(0, "", "");
            userModel.createAccount(request.Email, request.Password);
            return Ok(new { message = "Account created!" });
        } catch (Exception e){
            return BadRequest(new { message = "Failed to create account", error = e.Message });
        }
    }
}