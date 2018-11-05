
let productArr = [];
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const displayGoods = require("./displayGoods.js");
const manager = require("./manager");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
});

function addProduct(){
    connection.query("SELECT * FROM store", function (err, data) {
        productArr = [];
        if (err) throw err;
        data.forEach(function (obj) {
            productArr.push(obj.product)
        });
    });
    inquirer
        .prompt([
            {
                type: "input",
                message: "\nPlease enter the name of the product you would like to add:",
                name: "product",
                validate: validateProduct
            },
            {
                type: "list",
                message: "Please enter the department of this product:",
                choices: ["Electronics", "Food", "Clothing", "Sporting Goods", "Home and Garden", "Cosmetics", "Other"],
                name: "department"
            },
            {
                type: "input",
                message: "Please enter the price of this product:",
                name: "price",
                validate: validatePrice
            },
            {
                type: "input",
                message: "Please enter a quantity for this product's inventory:",
                name: "inventory",
                validate: validatePrice
            },
        ]).then(function(resp){
            connection.query("INSERT INTO store SET ?", 
            {
                product: resp.product,
                department: resp.department,
                price: resp.price,
                inventory: resp.inventory
            }, function(err, resp){
                if(err) throw err;
                displayGoods.displayGoods();
                setTimeout(msg, 1500);
                setTimeout(addProduct, 4000);
            })
        })
}

function validatePrice(input) {
    if (input > 0 && input < 100000) {
        return true;
    } else { return "Please choose a different number." }
}

function validateProduct(product) {
    if (productArr.includes(product) === false) {
        return true;
    } else { return "This product already exists." }
}

function showG(arr) {
    console.log(chalk.green(arr))
}

function showR(arr) {
    console.log(chalk.red(arr))
}

function showY(arr) {
    console.log(chalk.yellow(arr))
}

function msg(){
    showG("\nProduct added successfully!")
}

module.exports = {
    addProduct: addProduct
}