// External packages required
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

// Internal modules required
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern");
const { createConnection } = require("net");

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
    fs.writeFile("./dist/teamProfile.html", start, function(err) {
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
            console.log("Team Profile:", teamProfile);
            switch(addMember) {
                case "Yes":
                    addNewEmployee()
                    break;
                case "No":
                    endHTML();
                    break;
            }
        });
    });
};

// Function to for the end of the static HTML
function endHTML() {
    const end =
`       </div>
    </body>
</html>`
console.log(end);
};

function generateTeamProfile() {
    startHTML();
    addNewEmployee();
}

generateTeamProfile();


// //Function to write README file
// const writeToFile = (fileName, data) => {
//     fs.writeFile(fileName, data, (err) =>
//         err ? console.error(err) : console.log(chalk.bgMagenta(`Successfully created README.md`))
//     );
// }

// //Function to initialize the generator 
// const init = async () => {
//     try {
//         console.log(message);
//         // Answers to come from inquirer prompt
//         const answers = await inquirer.prompt(questions);
//         // Pull avatar from github
//         const image = await api.githubPic(answers);
//         // Generate Markdown using answers and avatar
//         const readme = generateMarkdown(answers, image);
//         // write to file
//         writeToFile("/Users/tiffanywashke/Desktop/homework/10_Homework-Team-Profile-Generator/Team-Profile-Generator/README.md", readme);
//     } catch (err) {
//         // Console log any error that occurs
//         console.log(err);
//     }
// }

// // Run function
// init();