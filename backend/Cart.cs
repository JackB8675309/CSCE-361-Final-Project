using System;
using System.Collections.Generic;

/*
* Class used to represent a user's shopping cart.
* Keeps track of items in cart, individual item totals,
* grand totals, item quantity, and handles checkout.
*/
public class Cart {
    public int cartID {get; set;}
    public int userID {get; set;}
    public List<Product> products {get; set;}
    public double total {get; set;}
    public int quantity {get; set;}

    public Cart(int cartID, int userID) {
        this.cartID = cartID;
        this.userID = userID;
        this.products = new List<Product>();
        this.total = 0;
    }

    public void AddItem(Product product) {
        products.Add(product);
        total += product.GetActivePrice();
        quantity++;
    }

    public void RemoveItem(Product product) {
        products.Remove(product);
        total -= product.GetActivePrice();
        quantity--;
    }

    /*
    * Method to checkout an existing cart
    * Includes error to make sure empty carts can't be checked out
    */
    public Order Checkout(string shippingDetails, string paymentDetails){
        if (this.products.Count == 0){
            throw new InvalidOperationException("Your cart is empty, add something to checkout");
        }

        Order newOrder = new Order(0, this.userID, new List<Product>(this.products), this.total, this.quantity, DateTime.Now, shippingDetails, paymentDetails);
        newOrder.placeOrder();
        this.products.Clear();
        this.total = 0;
        this.quantity = 0;

        return newOrder;
    }
}