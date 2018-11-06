
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const displayGoods = require("./displayGoods.js");
const lowInventory = require("./lowInventory.js");
const addToInventory = require("./addToInventory.js");
const addProduct = require("./addProduct.js")

function manager() {

    inquirer
        .prompt([
            {
                type: 'list',
                message: '\nAlright Boss. What do you want to do?',
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "managerFns"
            }
        ]).then(function (resp) {
            switch (resp.managerFns) {
                case ("View Products for Sale"):
                    displayGoods.displayGoods();
                    setTimeout(manager, 5000);
                    break;
                case ("View Low Inventory"):
                    lowInventory.lowInventory();
                    setTimeout(manager, 5000);
                    break;
                case ("Add to Inventory"):
                    addToInventory.addToInventory(manager);
                    break;
                case ("Add New Product"):
                    addProduct.addProduct(manager);
                    break;
            }
        })
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

module.exports = {
    manager: manager
}