CREATE Table users (
	userID int PRIMARY KEY,
	email varchar(255),
	password varchar(255)
);

CREATE Table category (
	categoryID int PRIMARY KEY,
	name varchar(255)
);

CREATE Table product (
	productID int PRIMARY KEY,
	sku varchar(50) unique,
	name varchar(255),
	description TEXT,
	manufacturer varchar(255),
	weight int,
	rating int,
	dimensions varchar(50),
	price decimal(10, 2),
	categoryID int,
	-- you need an image one as well
	FOREIGN KEY (categoryID) references category(categoryID)
);

CREATE Table cart (
	cartID int PRIMARY KEY,
	userID int,
	productID int,
	quantity int,
	FOREIGN KEY (userID) references Users(userID),
	FOREIGN KEY (productID) references product(productID)
);

CREATE Table Sale (
	saleID int PRIMARY KEY,
	startDate DATETIME,
	endDATE DATETIME,
	amount decimal(10, 2),
	categoryID int,
	productID int,
	FOREIGN KEY (categoryID) references category(categoryID),
	FOREIGN KEY (productID) references product(productID)
);

CREATE Table Orders (
	orderID int PRIMARY KEY,
	userID int,
	total decimal(10, 2),
	orderDate DATETIME,
	shippingDetails varchar(255)
	FOREIGN KEY (userID) references users(userID)
);