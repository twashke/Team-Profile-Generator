// Create a class for Employee
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // Run function to return name
    getName() {
        return this.name;
    }
    // Run function to return id
    getId() {
        return this.id;
    }
    // Run function to return email
    getEmail() {
        return this.email;
    }
    // Run function to return Employee role
    getRole() {
        return "Employee"
    }
}

module.exports = Employee;