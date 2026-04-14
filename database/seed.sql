-- =============================================
-- ONLINE STORE - SEED DATA
-- CSCE 361 Final Project
-- =============================================

-- Categories
INSERT INTO category (categoryID, name) VALUES 
(1, 'Summer Collection'),
(2, 'Clearance'),
(3, 'New Arrivals');

-- Products
INSERT INTO product (productID, sku, name, description, manufacturer, weight, rating, dimensions, price, image, categoryID) VALUES
(1, 'AB12345', 'Classic White Tee', 'A comfortable everyday white t-shirt.', 'BasicWear Co.', 0.3, 4.5, '12x8x1 inches', 29.99, 'https://via.placeholder.com/300', 1),
(2, 'AB12346', 'Summer Floral Dress', 'Light and breezy floral dress for summer.', 'SunStyle', 0.5, 4.8, '14x10x1 inches', 89.99, 'https://via.placeholder.com/300', 1),
(3, 'AB12347', 'Denim Jacket', 'Classic denim jacket for all seasons.', 'DenimCo', 1.2, 4.3, '16x12x2 inches', 129.99, 'https://via.placeholder.com/300', 1),
(4, 'AB12348', 'Running Sneakers', 'Lightweight sneakers for daily running.', 'RunFast', 0.8, 4.6, '12x6x4 inches', 79.99, 'https://via.placeholder.com/300', 2),
(5, 'AB12349', 'Leather Belt', 'Genuine leather belt with silver buckle.', 'AccessoryPlus', 0.3, 4.2, '40x1x0.2 inches', 34.99, 'https://via.placeholder.com/300', 2),
(6, 'AB12350', 'Canvas Backpack', 'Durable canvas backpack with laptop sleeve.', 'BagMaster', 0.9, 4.7, '18x12x6 inches', 59.99, 'https://via.placeholder.com/300', 3),
(7, 'AB12351', 'Wool Sweater', 'Warm wool sweater for cold days.', 'WoolCraft', 0.6, 4.4, '14x10x2 inches', 99.99, 'https://via.placeholder.com/300', 3),
(8, 'AB12352', 'Sunglasses', 'UV protection polarized sunglasses.', 'SunShield', 0.1, 4.9, '6x2x1 inches', 49.99, 'https://via.placeholder.com/300', 1);

-- Users (password nên được hash bởi backend, đây chỉ là test)
INSERT INTO users (userID, email, password) VALUES
(1, 'test@example.com', 'hashed_password_here'),
(2, 'admin@store.com', 'hashed_password_here');

-- Sales
INSERT INTO Sale (saleID, startDate, endDate, amount, percentage, categoryID, productID) VALUES
(1, '2024-06-01', '2024-06-30', NULL, 20.00, 1, NULL),   -- 20% off toàn bộ Summer Collection
(2, '2024-06-15', '2024-07-15', 10.00, NULL, 2, NULL),   -- $10 off toàn bộ Clearance
(3, '2024-06-20', '2024-06-25', NULL, 15.00, NULL, 6);   -- 15% off riêng Canvas Backpack

-- Cart (test user 1 đang có 2 sản phẩm trong giỏ)
INSERT INTO cart (cartID, userID, productID, quantity) VALUES
(1, 1, 1, 2),   -- 2 Classic White Tee
(2, 1, 6, 1);   -- 1 Canvas Backpack

-- Orders
INSERT INTO Orders (orderID, userID, total, orderDate, shippingDetails) VALUES
(1, 1, 149.97, '2024-06-01 10:30:00', '123 Main St, Lincoln, NE 68501');

-- OrderItems
INSERT INTO OrderItems (orderItemID, orderID, productID, quantity, price) VALUES
(1, 1, 1, 2, 29.99),   -- 2x Classic White Tee
(2, 1, 6, 1, 59.99);   -- 1x Canvas Backpack