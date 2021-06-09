// Declare class Manager
const Manager = require("../lib/Manager");

// Test for Manager Class
describe("Manager", () => {
    it("Sets the manager office number using constructor function", () => {
        // Declare variables for office number and manager
        const newOfficeNumber = "(555)867-5309";
        const newManager = new Manager("Alice", 200, "random@test.com", newOfficeNumber);
        // Expect the office number to be added to the manager
        expect(newManager.officeNumber).toBe(newOfficeNumber);
    });
});
// Test function to get office number
describe("getOfficeNumber", () => {
    it("Gets office number when getOfficeNumber function is called", () => {
        // Declare variables for office number and manager
        const managerNumber = "(555)867-5309";
        const newManager = new Manager("Alice", 200, "random@test.com", managerNumber);
        // Expect fucntion to return the manager office number
        expect(newManager.getOfficeNumber()).toBe(managerNumber);
    });
});
// Test function to get manager role
describe("getRole", () => {
    it("Gets manager role when getRole function is called", () => {
        // Declare variables for role and new engineer
        const managerRole = "Manager";
        const newManager = new Manager("Alice", 200, "random@test.com", "(555)867-5309");
        // Expect function to return engineer role
        expect(newManager.getRole()).toBe(managerRole);
    });
});