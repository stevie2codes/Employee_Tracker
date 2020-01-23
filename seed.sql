DROP DATABASE IF EXISTS Employee_Tracker;
CREATE DATABASE Employee_Tracker;

USE Employee_Tracker;

CREATE TABLE department(
     id INT NOT NULL AUTO_INCREMENT,
     names  VARCHAR(30),
     PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT 
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name)
VALUES ('Stephen', 'Webb');

INSERT INTO employee (first_name, last_name)
VALUES ('Robert', 'Paulson');
