using System;
using System.Data.SqlClient;

public class DatabaseConnection : IDisposable {
    private string connectionString;
    private SqlConnection conn;

    public DatabaseConnection() {
        //TODO: Update to the real thing later
        this.connectionString = @"Data Source=GBLAPTOP\SQLEXPRESS;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Application Name=""Microsoft SQL Server Management Studio - Query"";Command Timeout=2147483647";
    }

    public SqlConnection OpenConnection() {
        this.conn = new SqlConnection(connectionString);
        this.conn.Open();
        return this.conn;
    }

    public void Dispose() {
        if (this.conn != null) {
            this.conn.Close();
            this.conn.Dispose();
        }
    }
}
