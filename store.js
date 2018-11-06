
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const table = require("table");
const customer = require("./customer.js");
const manager = require("./manager.js");
const supervisor = require("./supervisor.js");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store_db'
})

connection.connect(function(err){
    if(err) throw err;
    enterStore();
})


function enterStore(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "\n****WELCOME TO THE STORE****\nPlease identify yourself:",
                choices: ["Customer", "Manager", "Supervisor"],
                name: "identification"
            }
        ]).then(function(resp){
            switch(resp.identification){
                case("Customer"):
                    show("\nWELCOME CUSTOMER!");
                    customer.customer();
                    break;
                case("Manager"):
                    show("WELCOME MANAGER!");
                    manager.manager();
                    break;
                case("Supervisor"):
                    show("WELCOME SUPE!");
                    supervisor.supervisor(enterStore);
                    break;
            }
        })
}

function show(arr){
    console.log(chalk.green(arr))
}