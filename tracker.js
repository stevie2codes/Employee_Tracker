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
          break;

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
  connection.query(`SELECT * FROM roles`, function(err, result) {
    if (err) throw err;

    inquirer
      .prompt([
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
          choices: function() {
            let choiceArray = [];
            for (let i = 0; i < result.length; i++) {
              choiceArray.push(result[i].title);
            }
            return choiceArray;
          }
        }
      ])
      .then(answer => {
        let chosenItem = "";
        for (let i = 0; i < result.length; i++) {
          if (result[i].title === answer.role) {
            chosenItem = parseInt(result[i].id);
          }
        }
        let query = `
     INSERT INTO employee(first_name, last_name, role_id)
      VALUES (?, ?, ?)`;
        connection.query(
          query,
          [answer.firstName, answer.lastName, chosenItem],
          (err, res) => {
            if (err) throw err;
            console.log(`New Employee added`);
            start();
          }
        );
      });
  });
}

function removeEmployee() {
  connection.query(`SELECT * FROM employee `, function(err, result) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          message: "choose and employee to remove",
          choices: function() {
            let choiceArray = [];
            for (let i = 0; i < result.length; i++) {
              choiceArray.push(result[i].first_name);
            }
            return choiceArray;
          }
        }
      ])
      .then(answer => {
        removedUser = "";
        for (let i = 0; i < result.length; i++) {
          if (result[i].first_name === answer.choice) {
            removedUser = parseInt(result[i].id);
          }
        }

        let query = `DELETE FROM employee  WHERE id = ?`;
        connection.query(query, [removedUser]),
          (err, res) => {
            if (err) throw err;
            console.log(`\n`);
            console.log("Employee has been removed");
           
          };
          start();
      });
  });
}
