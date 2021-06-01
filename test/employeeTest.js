// Declare class Employee
const Employee = require("../lib/employee");

// Test for Employee class
describe("Employee", () => {
    it("Returns an Employee as an object", () => {
        // Declare variable for new employee
        const newEmployee = new Employee();
        // Expect an object
        expect(typeof(newEmployee)).toBe("object");
    });
    it("Sets name using constructor function", () => {
        // Declare variables for name and employee
        const newName = "Emily";
        const newEmployee = newEmployee(newName);
        // Expect the employee name to be the new name
        expect(newEmployee.name).toBe(newName);
    });
    it("Sets id using constuctor function", () => {
        // Declare variables for id and employee
        const newId = 200;
        const newEmployee = new Employee("Emily", newId);
        // Expect the employee id to be the new id
        expect(newEmployee.id).toBe(newId);
    });
    it("Sets email using constructor function", () => {
        // Declare variables for email and employee
        const newEmail = "random@test.com";
        const newEmployee = new Employee("Emily", 200, newEmail);
        // Expect the employee email to be the new email
        expect(newEmployee.email).toBe(newEmail);
    });
    // Test function to get name
    describe("getName", () => {
        it("Gets name when getName function is called", () => {
            // Declare variables for name and employee
            const employeeName = "Emily";
            const newEmployee = new Employee(employeeName);
            // Expect function to return employee name
            expect(newEmployee.getName()).toBe(employeeName);
        });
    });
    // Test function to get id
    describe("getId", () => {
        it("Gets id when getId function is called", () => {
            // Declare variables for id and employee
            const employeeId = 200;
            const newEmployee = new Employee("Emily", employeeId);
            // Expect function to return employee id
            expect(newEmployee.getName()).toBe(employeeId);
        });
    });
    // Test function to get email
    describe("getEmail", () => {
        it("Gets email when getEmail function is called", () => {
            // Declare variables for email and employee
            const employeeEmail = "random@test.com";
            const newEmployee = new Employee("Emily", 200, employeeEmail);
            // Expect function to return employee email
            expect(newEmployee.getEmail()).toBe(employeeEmail);
        });
    });
    // Test function to get emnployee role
    describe("getRole", () => {
        it("Gets employee role when getRole function is called", () => {
            // Declare variables for role and employee
            const employeeRole = "Employee";
            const newEmployee = new Employee("Emily", 200, "random@test.com");
            // Expect function to return employee role
            expect(newEmployee.getRole()).toBe(employeeRole);
        })
    })

});


