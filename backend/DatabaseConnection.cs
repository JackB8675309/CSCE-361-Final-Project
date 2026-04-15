using System.Data.SqlClient;

public class DatabaseConnection {
    private string connectionString;

    public DatabaseConnection() {
        //TODO: Update to the real thing later
        this.connectionString = "Data Source=GBLAPTOP\SQLEXPRESS;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Application Name="Microsoft SQL Server Management Studio - Query";Command Timeout=2147483647";
    }

    public SqlConnection OpenConnection() {
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        return conn;
    }
}
