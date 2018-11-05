
let idArr = [];
let invArr = [];
let priceArr = [];
let productIndex;
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const displayGoods = require("./displayGoods.js");
const lowInventory = require("./lowInventory.js");
const manager = require("./manager.js");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
})

function addToInventory() {
    //run automatically to show availble goods
    displayGoods.displayGoods();
    //run automatically to show low inventory goods
    lowInventory.lowInventory();
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
                    message: "Please enter the ID of the product you would like to restock:",
                    name: "product",
                    validate: validateChoice
                },
                {
                    type: "input",
                    message: "Please enter the quantity you would like to add:",
                    name: "quantity",
                }
            ]).then(function (resp) {
                let currentInv = invArr[productIndex];
                let updatedInv = currentInv + parseInt(resp.quantity);
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
                    showG("\nProduct restocked!");
                    setTimeout(addToInventory, 2000);
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
    addToInventory: addToInventory
}