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
    */
    public bool login(String email, String password){
        string query = "SELECT userID from Users where email = @Email AND password = @Password";

        try {
            using (DatabaseConnection database = new DatabaseConnection()){
                using (SqlCommand command = new SqlCommand(query, database.OpenConnection())){
                    command.Parameters.Add("@Email", System.Data.SqlDbType.VarChar, 255).Value = email;
                    command.Parameters.Add("@Password", System.Data.SqlDbType.VarChar, 255).Value = password;
                    
                    object result = command.ExecuteScalar();

                    if (result != null){
                        this.userID = Convert.ToInt32(result);
                        this.email = email;
                        this.password = password;
                        return true;
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
        string query = "INSERT INTO users (email, password) VALUES (@Email, @Password)";
        using (DatabaseConnection db = new DatabaseConnection()){
            using (SqlCommand command = new SqlCommand(query, db.OpenConnection())){
                command.Parameters.Add("@Email", System.Data.SqlDbType.VarChar, 255).Value = email;
                command.Parameters.Add("@Password", System.Data.SqlDbType.VarChar, 255).Value = password;
                command.ExecuteNonQuery();
            }
        }
    }
}