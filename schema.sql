CREATE DATABASE store_db;

USE store_db;

CREATE TABLE store(
    id INTEGER(5) NOT NULL AUTO_INCREMENT,
    product VARCHAR(20) NOT NULL,
    department VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    inventory INTEGER(5) NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
)

INSERT INTO store (product, department, price, inventory) VALUES ("Laptop", "Electronics", 800.00, 10);
INSERT INTO store (product, department, price, inventory) VALUES ("Monitor", "Electronics", 200.00, 10);
INSERT INTO store (product, department, price, inventory) VALUES ("Mouse", "Electronics", 20.00, 10);
INSERT INTO store (product, department, price, inventory) VALUES ("Keyboard", "Electronics", 25.00, 10);
INSERT INTO store (product, department, price, inventory) VALUES ("Bang", "Food", 2.00, 1000);
INSERT INTO store (product, department, price, inventory) VALUES ("Sandwich", "Food", 5.00, 1000);
INSERT INTO store (product, department, price, inventory) VALUES ("Steak", "Food", 10.00, 1000);
INSERT INTO store (product, department, price, inventory) VALUES ("Hat", "Clothing", 15.00, 100);
INSERT INTO store (product, department, price, inventory) VALUES ("Shirt", "Clothing", 20.00, 100);
INSERT INTO store (product, department, price, inventory) VALUES ("Jeans", "Clothing", 25.00, 100);