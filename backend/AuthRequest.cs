/*
* Contains the user's login credentials
* and carries it over to the login/registration backend controllers
*/
public class AuthRequest {
    public string Email { get; set; }
    public string Password { get; set; }
}