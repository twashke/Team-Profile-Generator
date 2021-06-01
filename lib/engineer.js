// Declare class Employee
const Employee = require("./employee");

// Create a class for Engineer that adds to Employee class
class Engineer extends Employee {
    constructor(name, id, email, githubUsername) {
        super(name, id, email);
        this.githubUsername = githubUsername;
    }
    // Function to get Engineer role
    getRole() {
        return "Engineer";
    }
    // Function to get GitHub Username
    getGithubUsername() {
        return this.githubUsername;
    }
}

module.exports = Engineer;