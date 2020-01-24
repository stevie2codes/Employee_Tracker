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
                        break;
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
    let query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.names,roles.salary,employee.manager_id From employee INNER JOIN roles ON (employee.id = roles.id) INNER JOIN department ON (roles.id = department.id)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        start();
    });
}

function viewByDepartment(){
    inquirer
    .prompt({
        name: "choice",
        type: "list",
        message: "Choose a department",
        choices: ["Sales","Engineering","Finance"]
    })
    .then((answer) => {
        let query = `Select employee.first_name,employee.last_name, department.names FROM employee INNER JOIN department ON (department.names = ?)`
        connection.query(query, {choices: answer.choice}),
        function(err,res){
            if(err) throw err;
            console.log(res);
        }
    });
}
