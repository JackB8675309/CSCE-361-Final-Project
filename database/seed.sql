SET IDENTITY_INSERT users ON;
INSERT INTO users (userID, email, password) VALUES 
(1, 'lebronjames@gmail.com', '$2a$11$XJi2cOZ6isVZsm0Zu4phw.69b/F6OAyzjJFqaw94ScbiDABSxybAa'),
(2, 'todsmith@aol.com','$2a$11$ocpfgECfB8t9NNkXXqTve.kg0ApWF45/WcBA3jzfARqd3RKWsDpSa'),
(3, 'gavinblesh@gmail.com','$2a$11$X0.0VzohkSesZm7tLNHOR.WPecT4qqpAUT9wC6udEfOE.YhCiQqwO');
SET IDENTITY_INSERT users OFF;

SET IDENTITY_INSERT category ON;
INSERT INTO category (categoryID, name) VALUES 
(1,'New Arrivals'),
(2, 'On Sale'),
(3, 'Summer Collection');
SET IDENTITY_INSERT category OFF;

-- All item photos provided from unsplash.com
SET IDENTITY_INSERT product ON;
INSERT INTO product (productID, sku, name, description, manufacturer, weight, rating, dimensions, price, imageUrl, categoryID) VALUES
(1, 'XM4000', 'Floral Shirt', 'A classic loose fitting shirt that is perfect for summer', 'ShirtCo', 1, 4.5, '10x1x5', 20.00, 'https://images.unsplash.com/photo-1591843463644-06e650d6c695?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmxvcmFsJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D', 3),
(2, 'ZM2003', 'Winter Puffer', 'A warm and flurry puffer coat, perfect for winter', 'Shein', 5, 3.5, '20x5x5', 40.00, 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
(3, 'XM4001', 'Tennis Shorts', 'A summer staple, these breathable, loose fitting shorts are perfect for the summer weather', 'Challengers', 1, 5, '5x2x3', 15.00, 'https://images.unsplash.com/photo-1593263049629-a6bbe863049f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
(4, 'AW2006', 'Sneakers', 'An everyday classic to get you from point A to point B, with new foam technology', 'Nike', 5, 4.9, '12x8x3', 90.00, 'https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
(5, 'SH4003', 'White Socks', 'Tight fit, knit socks perfect for everyday use', 'Kirkland', 1, 4.5, '8x5x3', 15.00, 'https://plus.unsplash.com/premium_photo-1727286320353-815a792ca2da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
(6, 'SH4004', 'Sunglasses', 'UV Protection Sunglasses, perfect for sunny days', 'Rayban', 2, 4.8, '1x1x.5', 40.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
(7, 'AW2009', 'Leather Belt', '100% All-leater belt', 'GAP', 3, 4.5, '30x2x1', 20.99, 'https://images.unsplash.com/photo-1666723043169-22e29545675c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2);
SET IDENTITY_INSERT product OFF;

SET IDENTITY_INSERT Sale ON;
INSERT INTO Sale (saleID, startDate, endDate, discountAmount, discountPercentage, categoryID, productID) VALUES
(1, '04-21-2026', '09-20-2026', 15, NULL, NULL, 2),
(2, '04-20-2026', '05-20-2026', 5, NULL, 2, 5),
(3, '01-01-2026', '01-01-2027', NULL, 50, NULL, 7);
SET IDENTITY_INSERT Sale OFF;

SET IDENTITY_INSERT cart ON;
INSERT INTO cart (cartID, userID, productID, quantity) VALUES
(1, 1, 3, 2),
(2, 3, 1, 5);
SET IDENTITY_INSERT cart OFF;

SET IDENTITY_INSERT Orders ON;
INSERT INTO Orders (orderID, userID, total, orderDate, shippingDetails) VALUES
(1, 1, 39.98, '04-22-2026', '123 S 15th St, Lincoln, NE, 68508'),
(2, 3, 124.95, '04-22-2026', '321 N 14th St, Lincoln, NE, 68501');
SET IDENTITY_INSERT Orders OFF;

SET IDENTITY_INSERT OrderItems ON;
INSERT INTO OrderItems (orderItemID, orderID, productID, quantity, price) VALUES
(1, 1, 5, 1, 19.99),
(2, 1, 6, 2, 9.99);
SET IDENTITY_INSERT OrderItems OFF;