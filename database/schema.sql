-- =============================================
-- ONLINE STORE - DATABASE SCHEMA
-- CSCE 361 Final Project
-- =============================================

CREATE TABLE users (
    userID int PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL   -- backend phải hash password này!
);

CREATE TABLE category (
    categoryID int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL
);

CREATE TABLE product (
    productID int PRIMARY KEY AUTO_INCREMENT,
    sku varchar(50) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    description TEXT,
    manufacturer varchar(255),
    weight decimal(10,2),
    rating decimal(3,1),
    dimensions varchar(50),
    price decimal(10,2) NOT NULL,
    image varchar(255),              -- ← thêm vào
    categoryID int,
    FOREIGN KEY (categoryID) REFERENCES category(categoryID)
);

CREATE TABLE cart (
    cartID int PRIMARY KEY AUTO_INCREMENT,
    userID int NOT NULL,
    productID int NOT NULL,
    quantity int NOT NULL DEFAULT 1,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);

CREATE TABLE Sale (
    saleID int PRIMARY KEY AUTO_INCREMENT,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    amount decimal(10,2),            -- dollar amount OFF
    percentage decimal(5,2),         -- % OFF (thêm vào cho linh hoạt)
    categoryID int,                  -- null nếu sale theo product
    productID int,                   -- null nếu sale theo category
    FOREIGN KEY (categoryID) REFERENCES category(categoryID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);

CREATE TABLE Orders (
    orderID int PRIMARY KEY AUTO_INCREMENT,
    userID int NOT NULL,
    total decimal(10,2) NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    shippingDetails varchar(255),    -- ← thêm dấu phẩy (bug cũ)
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE OrderItems (            -- ← bảng mới, rất quan trọng!
    orderItemID int PRIMARY KEY AUTO_INCREMENT,
    orderID int NOT NULL,
    productID int NOT NULL,
    quantity int NOT NULL,
    price decimal(10,2) NOT NULL,    -- giá tại thời điểm mua
    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);