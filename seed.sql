
--------Department--------------
INSERT INTO department(names)
VALUES ("Sales");

INSERT INTO department(names)
VALUES ("Engineering");

INSERT INTO department(names)
VALUES ("Finance");

INSERT INTO department(names)
VALUES ("Legal")

-----------------------Roles------------------
INSERT INTO roles(title, salary, department_id)
VALUES ("Sales Lead", 20000, 1);
INSERT INTO roles(title, salary, department_id)
VALUES ("Sales person", 60000, 1);

INSERT INTO roles(title, salary, department_id)
VALUES ("Lead Engineer", 120000, 2);
INSERT INTO roles(title, salary, department_id)
VALUES ("Junior dev", 80000, 2);

INSERT INTO roles(title, salary, department_id)
VALUES ("Accountant", 110000, 3);

INSERT INTO roles(title, salary, department_id)
VALUES ("Lawyer", 210000, 4);


------Employees-----------------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Stephen', 'Webb',1,null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robert', 'Paulson',1, 1);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('Tyler', 'Durden',2,3);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('Marla', 'Singer',3, null);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('Aurthor', 'Shelby',4, 3);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('Tommy', 'Shelby',3, 1);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('Don', 'Jonson',4, 3);






-- SELECT * from roles;

-- USE Employee_Tracker;

-- SELECT e.id,e.first_name, m.id,m.first_name
-- FROM employee as e
-- LEFT JOIN employee m on e.manager_id = m.id;

-- UPDATE employee 
-- SET manager_id = 1
-- WHERE id = 3;

-- USE Employee_Tracker;
-- SELECT e.id, e.first_name, e.last_name, roles.title
-- FROM employee as e
-- LEFT JOIN employee  on e.role_id = roles.title

-- UPDATE roles 
-- SET title = "Lead Engineer"
-- WHERE id = 1;


-- --  Main query For all employees
-- SELECT e.id, e.first_name, e.last_name, r.title,r.salary,d.names as department, CONCAT(m.first_name," ", m.last_name) as manager
-- FROM employee as e
-- INNER JOIN roles as r
-- ON (e.id = r.id) INNER JOIN department as d ON (r.id = d.id)
-- LEFT JOIN employee as m on m.id = e.manager_id ORDER BY e.id;
-- -- Main query