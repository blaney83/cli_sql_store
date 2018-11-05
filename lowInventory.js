
const mysql = require("mysql");
const table = require("table");
const chalk = require("chalk");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
})
let dataArr = [];

function lowInventory() {
    connection.query('SELECT * FROM store', function (err, data) {
        objectsToArray(data);
        if (dataArr.length > 0) {
            dataArr.unshift(["ID", "PRODUCT", "DEPARTMENT", "PRICE", "INVENTORY"]);
            output = table.table(dataArr);
            showR(output)
        } else {
            showG("\nNice work! Your Inventory is all looking good!")
        }
    })
}

function objectsToArray(dataArray) {
    //important to clear data array before each time, or else the array gets really big after multiple purchases
    dataArr = [];
    dataArray.forEach(function (obj) {
        if (obj.inventory <= 5) {
            let itemArray = [];
            itemArray.push(obj.id, obj.product, obj.department, obj.price, obj.inventory)
            dataArr.push(itemArray);
        }
    })
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
    lowInventory: lowInventory
}