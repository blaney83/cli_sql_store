
const mysql = require("mysql");
const table = require("table");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
})
let dataArr = [];

function displayGoods(){
    connection.query('SELECT * FROM store', function(err, data){
        objectsToArray(data);
        dataArr.unshift(["ID", "PRODUCT", "DEPARTMENT", "PRICE", "INVENTORY"]);
        output = table.table(dataArr);
        console.log(output)
    })
}

function objectsToArray(dataArray){
    //important to clear data array before each time, or else the array gets really big after multiple purchases
    dataArr = [];
    dataArray.forEach(function(obj){
        let itemArray = [];
        itemArray.push(obj.id, obj.product, obj.department, obj.price, obj.inventory)
        dataArr.push(itemArray);
    })
}

module.exports = {
    displayGoods : displayGoods
}