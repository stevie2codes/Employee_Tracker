const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const chalkTable = chalk.bold.bgGreenBright.red;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", //connecting to DataBase
  password: "$Webb001",
  database: "Employee_Tracker"
});
// IF (connection) start program
connection.connect(err => {
  if (err) throw err;
  start();
});
/* Kicking off the prompt to start program */
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: chalk.underline
        .rgb(255, 127, 0)
        .bold("What would you like to do?"),
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
    }) /* User Input will activate a function from switch statement */
    .then(answer => {
      switch (answer.action) {
        case "View all Employees":
          viewEmployees();
          break;

        case "View all Employees by Department":
          viewByDepartment();
          break;
        case "View all Employees by Manger":
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

/*   functions for switch statement  */

function viewEmployees() {
  let query = ` SELECT e.id, e.first_name, e.last_name, r.title,r.salary,d.names as department, CONCAT(m.first_name," ", m.last_name) as manager
  FROM employee as e
  LEFT JOIN roles as r
  ON (e.id = r.id) INNER JOIN department as d ON (r.id = d.id)
  LEFT JOIN employee as m on m.id = e.manager_id ORDER BY e.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    start();
  });
}

function viewByDepartment() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "Choose a department",
      choices: ["Sales", "Engineering", "Finance"]
    })
    .then(answer => {
      let query = `Select e.id, e.first_name,e.last_name, d.names as department
      FROM employee as e 
      INNER JOIN department as d ON (e.id = d.id) WHERE d.names = ?`;
      connection.query(query, [answer.choice], (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
      start();
    });
}

//Still need to figure out how to populate the manager id and put into choices
function viewByManager() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "Choose a manager",
      choices: ["stephen", "tyler", "Tommy"]
    })
    .then(answer => {
      let query = `Select CONCAT(e.first_name, " ", e.last_name) as Employee,
      CONCAT(m.first_name," ", m.last_name) as Manager
      FROM employee as e 
      INNER JOIN employee as m ON e.manager_id = m.id `;
      connection.query(query, [answer.choice], (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        start();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt(
      {
        name: "firstName",
        type: "input",
        message: "What is your employees first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is your employees last name?"
      },
      {
        name: "role",
        type: "list",
        choices: ["Sales", "Engineering", "Finance"]
      },
      {
        name: "manager",
        type: "list",
        message: `Who is your Employee's Manager?`,
        choices: ["a", "b", "c"]
      }
    )
    .then((firstName, lastName, role, manager) => {
      let query = `INSERT INTO employee(first_name, last_name)
      VALUES (?, ?) FROM employee`;
      connection.query(
        query,
        [firstName.firstName, lastName.lastName],
        (err, res) => {
          console.table(res);
        }
      );
    });
}

// SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.names,roles.salary,employee.manager_id From employee INNER JOIN roles ON (employee.id = roles.id) INNER JOIN department ON (roles.id = department.id)
