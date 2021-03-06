// Declare class Employee
const Employee = require("./Employee");

// Create a class for Manager that adds to Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    // Function to get office number
    getOfficeNumber() {
        return this.officeNumber;
    }
    // Function to get Manager role
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;