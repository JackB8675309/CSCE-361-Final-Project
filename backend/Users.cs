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

    public void login(string email, string password){

    }

/*
https://dev.to/clover_luo/building-a-user-registration-system-in-net-core-c-ogg
*/
    public void createAccount(string email, string password){
        
    }
}