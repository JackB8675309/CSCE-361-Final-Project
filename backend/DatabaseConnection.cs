using System;
using System.Data.SqlClient;

public class DatabaseConnection : IDisposable {
    private string connectionString;
    private SqlConnection conn;

    public DatabaseConnection() {
        this.connectionString = @"Data Source=.\SQLEXPRESS;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;";
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
