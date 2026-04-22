using System;
using System.Data.SqlClient;
public class Users {
    public int userID {get; set;}
    public string email {get; set;}
    public string password {get; set;}

    public Users(int userID, string email, string password) {
        this.userID = userID;
        this.email = email;
        this.password = password;
    }

    /*
    * Information to create this was sourced from:
    * https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.executescalar?view=netframework-4.8.1
    *
    * Information to create and store the hashed password was sourced from:
    * https://claudiobernasconi.ch/blog/how-to-hash-passwords-with-bcrypt-in-csharp/
    */
    public bool login(String email, String password){
        string query = "SELECT userID, password from Users where email = @Email";

        try {
            using (DatabaseConnection database = new DatabaseConnection()){
                using (SqlCommand command = new SqlCommand(query, database.OpenConnection())){
                    command.Parameters.Add("@Email", System.Data.SqlDbType.VarChar, 255).Value = email;
                    
                    using (SqlDataReader reader = command.ExecuteReader()) {
                        if (reader.Read()) {
                            string storedHash = reader["password"].ToString();
                            bool isPasswordCorrect = false;
                            isPasswordCorrect = BCrypt.Net.BCrypt.Verify(password, storedHash);

                            if (isPasswordCorrect) {
                                this.userID = Convert.ToInt32(reader["userID"]);
                                this.email = email;
                                this.password = storedHash;
                                return true;
                            }
                        }
                    }
                }
            }
        }
        catch (SqlException e){
            Console.WriteLine(e.Message);
        }
        return false;
    }


    public void createAccount(String email, String password){
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
        string query = "INSERT INTO users (email, password) VALUES (@Email, @Password)";
        using (DatabaseConnection db = new DatabaseConnection()){
            using (SqlCommand command = new SqlCommand(query, db.OpenConnection())){
                command.Parameters.Add("@Email", System.Data.SqlDbType.VarChar, 255).Value = email;
                command.Parameters.Add("@Password", System.Data.SqlDbType.VarChar, 255).Value = hashedPassword;
                command.ExecuteNonQuery();
            }
        }
    }
}