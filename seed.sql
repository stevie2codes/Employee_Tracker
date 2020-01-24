DROP DATABASE IF EXISTS Employee_Tracker;
CREATE DATABASE Employee_Tracker;

USE Employee_Tracker;



CREATE TABLE department(
     id INT NOT NULL AUTO_INCREMENT,
     names VARCHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
     FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO employee (first_name, last_name)
VALUES ('Stephen', 'Webb');

INSERT INTO employee (first_name, last_name)
VALUES ('Robert', 'Paulson');

INSERT INTO employee (first_name, last_name)
VALUES ('Tyler', 'Durden');

INSERT INTO employee (first_name, last_name)
VALUES ('Marla', 'Singer');

INSERT INTO department(names)
VALUES ("Sales");
INSERT INTO department(names)
VALUES ("Engineering");
INSERT INTO department(names)
VALUES ("Finance");

INSERT INTO roles(title, salary)
VALUES ("Sales Lead", 2000);

INSERT INTO roles(title, salary)
VALUES ("Lead Engineer", 120000);

INSERT INTO roles(title, salary)
VALUES ("Accountant", 110000);


SELECT * from roles;