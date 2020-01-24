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
            name: "action",
            type: "list",
            message: chalk.underline.rgb(255, 127, 0).bold("What would you like to do?"),
            choices: [
                "View all Employees",
                "View all Employees by Department",
                "View all Employees by Manger",
                "Add Employee",
                "Remove Employee",
                "Update Employee by role",
                "Update Employee by Manager",
                "exit"
            ]
        })
        .then(answer => {
            switch (answer.action) {
                case "View all Employees":
                    viewEmployees();
                    break;

                case "View all Employees by Department":
                    viewByDepartment();

                case "View all employees by Manager":
                    viewByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();

                case "Update Employee by role":
                    updateByRole();
                    break;

                case "Update Employee by Manager":
                    updateByManager();
                    break;

                case "exit":
                    connection.end();
                    break;

            }
        });
}

function viewEmployees() {
    let query = "SELECT id, first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        start();  
    });   
}

