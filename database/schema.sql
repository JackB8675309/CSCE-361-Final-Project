CREATE Table users (
	userID int IDENTITY(1,1) PRIMARY KEY,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL
);

CREATE Table category (
	categoryID int IDENTITY(1,1) PRIMARY KEY,
	name varchar(255) NOT NULL
);

CREATE Table product (
	productID int IDENTITY(1,1) PRIMARY KEY,
	sku varchar(50) UNIQUE NOT NULL,
	name varchar(255) NOT NULL,
	description TEXT NOT NULL,
	manufacturer varchar(255) NOT NULL,
	weight int NOT NULL,
	rating int NOT NULL,
	dimensions varchar(50) NOT NULL,
	price decimal(10, 2) NOT NULL,
	categoryID int NOT NULL,
	imageUrl NVARCHAR(2048) NOT NULL,
	-- imageURL design was prompted using Google's Gemini 3.1 Pro 
	-- with the prompt "how would I store an image in an SQL database"
	FOREIGN KEY (categoryID) references category(categoryID)
);

CREATE Table cart (
	cartID int IDENTITY(1,1) PRIMARY KEY,
	userID int NOT NULL,
	productID int NOT NULL,
	quantity int NOT NULL,
	FOREIGN KEY (userID) references Users(userID),
	FOREIGN KEY (productID) references product(productID)
);

CREATE Table Sale (
	saleID int IDENTITY(1,1) PRIMARY KEY,
	startDate DATETIME NOT NULL,
	endDATE DATETIME NOT NULL,
	discountAmount decimal(10, 2) NOT NULL,
	categoryID int,
	productID int,
	FOREIGN KEY (categoryID) references category(categoryID),
	FOREIGN KEY (productID) references product(productID)
);

CREATE Table Orders (
	orderID int IDENTITY(1,1) PRIMARY KEY,
	userID int NOT NULL,
	total decimal(10, 2) NOT NULL,
	orderDate DATETIME NOT NULL,
	shippingDetails varchar(255) NOT NULL,
	FOREIGN KEY (userID) references users(userID)
);

CREATE Table OrderItems (
	orderItemID int IDENTITY(1,1) PRIMARY KEY,
	orderID int NOT NULL,
	productID int NOT NULL,
	quantity int NOT NULL,
	price decimal(10, 2) NOT NULL,
	FOREIGN KEY (orderID) references Orders(orderID),
	FOREIGN KEY (productID) references product(productID)
);