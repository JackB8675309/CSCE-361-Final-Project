using System.Data.SqlClient;

public class DatabaseConnection {
    private string connectionString;

    public DatabaseConnection() {
        //this.connectionString = "";
        // https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlconnection?view=dotnet-plat-ext-9.0
    }

    public SqlConnection OpenConnection() {
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        return conn;
    }
}
