// External packages required
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

// Internal modules required
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern");

// Declare variables for employees
const teamProfile = [];
// Declare variables for messages
const startMessage = chalk.bgCyan(`Welcome to the Team Profile Generator! Answer the following questions to generate your team profile`);
const addMemberMessage = chalk.bgCyan("Added this employee to the Team Profile");
const spacerMessage = ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
const endMessage = chalk.bgCyan("Your Team Profile page has been created!");

// Function to for beginning of static HTML
function startHTML() {
    // Variable for start of HTML
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
    fs.writeFile("./dist/index.html", start, function(err) {
        // If error console log the error
        if (err) {
        console.log(err);
        }
    });
    // Display beginning message
    console.log(startMessage);
};

// Async function to create a new employee
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
    // Function to create variable for employee role
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
            // Question to add additional team member
            type: "list",
            name: "addMember",
            message: "Would you like to add an additional team member?",
            choices: ["Yes", "No"],
        }])
        // Function to create new employee depending role chosen
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
            // Call function to add employee information to HTML
            addHTML(newEmployee);
            // Switch statement for additional employee question
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
        // HTML for Manager Card
        if (role === "Manager") {
            const officeNumber = newEmployee.getOfficeNumber();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fas fa-phone"></i>   Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNumber}</li>
            </ul>
            </div>`
        // HTML for Engineer Card
        } else if (role === "Engineer") {
            const githubUsername = newEmployee.getGithubUsername();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fab fa-github-square"></i>   Engineer</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${githubUsername}">${githubUsername}</a></li>
            </ul>
            </div>`
        // HTML for Intern Card
        } else if (role === "Intern") {
            const school = newEmployee.getSchool();
            html = `
            <div class="card m-3" style="width: 18rem;">
            <div class="card-body bg-primary text-white text-center">
                <h4 class="card-title">${name}</h4>
                <h4><i class="fas fa-graduation-cap"></i>   Intern</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>`
        }
        // Console log add member message
        console.log(addMemberMessage);
        // Console log spacer message
        console.log(spacerMessage);
        // Append Team Profile HTML
        fs.appendFile("./dist/index.html", html, function (err) {
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
// Append Team Profile HTML
fs.appendFile("./dist/index.html", end, function (err) {
    if (err) {
        console.log(err);
    };
});
// Console log end message
console.log(endMessage);
};

// Function to generate team profile
function generateTeamProfile() {
    startHTML();
    addNewEmployee();
}

// Generate Team Profile
generateTeamProfile();
