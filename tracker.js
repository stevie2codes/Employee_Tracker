const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const chalkTable = chalk.bold.bgGreenBright.red;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "$Webb001",
    database: "Employee_Tracker"
});

connection.connect(err => {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: chalk.underline.rgb(255, 127, 0).bold("What would you like to do?"),
            choices: [
                "View all Employees",
                "View all Employees by Department",
                "View all Employees by Manger",
                "Add Employee",
                "Remove Employee",
                "Update Employee by role",
                "Update Employee by Manager"
            ]
        })
        .then(answer => {
            if (answer.selection === "View all Employees") {
                viewEmployees();
            }
            if(answer.selection === "View all Employees by Department"){

            }
        });
}

function viewEmployees() {
    connection.query(
        "SELECT employee.id, employee.first_name,employee.last_name, department.names FROM employee INNER JOIN department ON employee.id=employee.id",
     (err, res) =>
         {
        if (err) throw err;
        console.table(res);
    });
}
