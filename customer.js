
let idArr = [];
let invArr = [];
let priceArr = [];
let productIndex;
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const displayGoods = require("./displayGoods.js");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
})

function customer() {
    //run automatically to show availble goods
    displayGoods.displayGoods();
    //run on selection of customer to create the array of potential item ID's
    connection.query("SELECT * FROM store", function (err, data) {
        if (err) throw err;
        data.forEach(function (obj) {
            idArr.push(obj.id)
            invArr.push(obj.inventory);
            priceArr.push(obj.price);
        });
        //prompt for choosing item
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please enter the ID of the product you would like to buy:",
                    name: "product",
                    validate: validateChoice
                },
                {
                    type: "input",
                    message: "Please enter the quantity you would like to buy:",
                    name: "quantity",
                    validate: validateQuantity
                }
            ]).then(function (resp) {
                let currentInv = invArr[productIndex];
                let updatedInv = currentInv - resp.quantity;
                let itemPrice = priceArr[productIndex];
                let orderTotal = itemPrice * resp.quantity;
                connection.query("UPDATE store SET ? WHERE ?", 
                [
                    {
                        inventory: updatedInv
                    },
                    {
                        id: resp.product
                    }
                ], function(err){
                    if(err) throw err;
                    showG("\nYOUR PURCHASE WAS SUCCESSFUL! \n\nYour order total is: $" + orderTotal);
                    setTimeout(customer, 4000);
                })
            })
    });
}

function validateChoice(input) {
    productIndex = idArr.indexOf(parseInt(input));
    if (productIndex >= 0) {
        return true;
    } else {
        showR("\nThat item does not exist. Please reference the table of available items and re-enter a valid product ID.")
    }
}

function validateQuantity(input) {
    if (invArr[productIndex] >= input) {
        return true;
    } else {
        showR("\nIt looks like our inventory is to low to process an order of that size! Please order less or contact a manager for further assistance.")
    }
}

function showG(arr){
    console.log(chalk.green(arr))
}

function showR(arr){
    console.log(chalk.red(arr))
}

function showY(arr){
    console.log(chalk.yellow(arr))
}

module.exports = {
    customer: customer
}