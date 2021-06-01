// Declare class Intern
const Intern = require("../lib/intern");

// Test for Intern Class
describe("Intern", () => {
    it("Sets the intern school using constructor function", () => {
        // Declare variables for school and new intern
        const newSchool = "UW Coding Bootcamp";
        const newIntern = new Intern("Emily", 200, "random@test.com", newSchool);
        // Expect the school to be added to the intern
        expect(newIntern.school).toBe(newSchool);
    });
});
// Test function to get school
describe("getSchool", () => {
    it("Gets school when getSchool function is called", () => {
        // Declare variables for school and new intern
        const internSchool = "UW Coding Bootcamp";
        const newIntern = new Intern("Emily", 200, "random@test.com", internSchool);
        // Expect function to return the intern school
        expect(newIntern.getSchool()).toBe(internSchool);
    });
});
// Test function to get intern role
describe("getRole", () => {
    it("Gets intern role when getRole function is called", () => {
        // Declare variables for role and new engineer
        const internRole = "Intern";
        const newIntern = new Intern("Emily", 200, "random@test.com", "UW Coding Bootcamp");
        // Expect function to return engineer role
        expect(newIntern.getRole()).toBe(internRole);
    });
});