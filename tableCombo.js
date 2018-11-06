
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
let salesArr = [];
let saleIn = 0;

function tableCombo(){
    pullSales();
    connection.query('SELECT * FROM departments', function(err, data){
        objectsToArray(data);
        addSales();
        createProfit();
        dataArr.unshift(["DEPARTMENT ID", "DEPARTMENT", "OVERHEAD COST", "TOTAL SALES", "PROFIT"]);
        output = table.table(dataArr);
        console.log(output)
    })
}

function pullSales(){
    salesArr=[];
    connection.query("SELECT department, SUM(sales) AS sales FROM store GROUP BY department", function(err, data){
        if(err) throw err;
        data.forEach(function(obj){
            salesArr.push(obj.sales)
        })
    })
}

function objectsToArray(dataArray){
    //important to clear data array before each time, or else the array gets really big after multiple purchases
    dataArr = [];
    dataArray.forEach(function(obj){
        let itemArray = [];
        itemArray.push(obj.d_id, obj.d_name, obj.overhead_cost)
        dataArr.push(itemArray);
    })
}

function addSales(){
    saleIn = 0;
    dataArr.forEach(function(arr){
        arr.push(salesArr[saleIn]);
        saleIn = saleIn + 1;
    })
}

function createProfit(){
    dataArr.forEach(function(arr){
        let profVal = arr[3] - arr[2];
        arr.push(profVal);
    })
}

module.exports = {
    tableCombo:tableCombo
}