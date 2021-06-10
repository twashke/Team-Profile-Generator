// External packages required
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

// Internal modules required
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern");
const Employee = require("./lib/Employee");

// Declare variables for employees
const teamProfile = [];
// Declare variables for message
const message = chalk.bgCyan(`Welcome to the Team Profile Generator! Answer the following questions to generate your team profile`);

// Function to for beginning of static HTML
function startHTML() {
    // Variable to for start of HTML
    const start =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Team Profile</title>
    <!-- CSS for Bootstap and Font Awesome -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c3beaf856b.js" crossorigin="anonymous"></script>
</head>
    <body> 
        <!-- Jumbotron for Team Profile -->
        <div class="container .bg-danger">
            <div class="jumbotron jumbotron-fluid">
                <h1 class="display-4 text-center text-danger"><span class="fas fa-users"></span> Team Profile</h1>
            </div>
        </div>
        <!-- Container for Employee Cards -->
        <div class="container d-flex flex-row flex-wrap justify-content-between">`
    // Write to File the Beginning of the HTML
    fs.writeFile("index.html", start, function(err) {
        // If error console log the error
        if (err) {
        console.log(err);
        }
    });
    // Display beginning message
    console.log(message);
};

const addNewEmployee = async() => {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter the employee's name.",
    },
    // Enter the id of the employee
    {
        type: "input",
        name: "id",
        message: "Enter the employee's id number.",
    },
    // Enter the employee email address
    {
        type: "input",
        name: "email",
        message: "Enter the employee's email address."
    },
    {
    // List of roles for each employee
        type: "list",
        name: "role",
        message: "Choose the employee's role from the list below:",
        choices: ["Manager", "Engineer", "Intern"],
    }])
    // Function depending on role chosen
    .then(function({name, id, email, role}) {
        let employeeRole = "";
        switch(role) {
            case "Manager":
                employeeRole = "office phone number"
                break;
            case "Engineer":
                employeeRole = "GitHub Username"
                break;
            case "Intern":
                employeeRole = "school name"
                break;
        }
        inquirer.prompt([{
            // Question for employee information depending on role chosen
            type: "inut",
            name: "employeeRole",
            message: `What is this employee's ${employeeRole}?`,
        },
        {
            type: "list",
            name: "addMember",
            message: "Would you like to add an additional team member?",
            choices: ["Yes", "No"],
        }])
        .then(function({employeeRole, addMember}) {
            let newEmployee;
                if (role === "Manager") {
                    newEmployee = new Manager(name, id, email, employeeRole)
                } else if (role === "Engineer") {
                    newEmployee = new Engineer(name, id, email, employeeRole)
                } else if (role === "Intern") {
                    newEmployee = new Intern(name, id, email, employeeRole);
                }
            // Add new employee to the variable declared
            teamProfile.push(newEmployee);
            addHTML(newEmployee);
            switch(addMember) {
                case "Yes":
                    addNewEmployee()
                    break;
                case "No":
                    endHTML();
            }
        });
    });
};
// Function to write the HTML cards
function addHTML(newEmployee) {
    return new Promise(function(resolve, reject) {
        const name = newEmployee.getName();
        const role = newEmployee.getRole();
        const id = newEmployee.getId();
        const email = newEmployee.getEmail();
        let html = "";

        if (role === "Manager") {
            const officeNumber = newEmployee.getOfficeNumber();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fas fa-phone"></i> Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNumber}</li>
            </ul>
            </div>`
        } else if (role === "Engineer") {
            const githubUsername = newEmployee.getGithubUsername();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fab fa-github-square"></i> Engineer</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${githubUsername}">${githubUsername}</a></li>
            </ul>
            </div>`
        } else if (role === "Intern") {
            const school = newEmployee.getSchool();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fas fa-graduation-cap"></i> Intern</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>`
        }
        console.log("Adding the employee to the Team Profile");
        fs.appendFile("index.html", html, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
};

// Function to for the end of the static HTML
function endHTML() {
    const end =
`       </div>
    </body>
</html>`
fs.appendFile("index.html", end, function (err) {
    if (err) {
        console.log(err);
    };
});
console.log("end");
};

function generateTeamProfile() {
    startHTML();
    addNewEmployee();
}

generateTeamProfile();
