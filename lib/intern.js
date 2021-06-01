// Declare class Employee
const Employee = require("./employee");

// Create a class for Manager that adds to Employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    // Function to get Intern role
    getRole() {
        return "Intern";
    }
    // Function to get school
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;