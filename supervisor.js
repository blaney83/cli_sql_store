
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const table = require("table");
const tableCombo = require("./tableCombo.js")
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
});

function supervisor(cb){
    inquirer
        .prompt([
            {
                type: "list",
                message: "SUPE! Please choose an option to proceed: ",
                choices: ["View Profits", "Main Menu"],
                name: "supeFn"
            }
        ]).then(function(resp){
            switch(resp.supeFn){
                case("View Profits"):
                    tableCombo.tableCombo();
                    setTimeout(supervisor, 4000);
                    break;
                // case("Add Department"):
                //     //something or other
                //     break;
                case("Main Menu"):
                    setTimeout(cb, 500);
                    break;
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
    supervisor: supervisor
}