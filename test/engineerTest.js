// Declare class Engineer
const Engineer = require("../lib/engineer");

// Test for Engineer class
describe("Engineer", () => {
    it("Sets the GitHub Username using constructor function", () => {
        // Declare variables for github username and new engineer
        const newGithub = "githubUsername";
        const newEngineer = new Engineer("Emily", 200, "random@test.com", newGithub);
        // Expect the github username to be added to the engineer
        expect(newEngineer.githubUsername).toBe(newGithub);
    });
});
// Test function to get github username
describe("getGithubUsername", () => {
    it("Gets github username when getGithubUsername function is called", ()=> {
        // Declare variables for role and new github username
        const engineerGithub = "githubUsername";
        const newEngineer = new Engineer("Emily", 200, "random@test.com");
        // Expect the Engineer github name to be the new github username
        expect(newEngineer.getGithubUsername()).toBe(engineerGithub);
    });
});
// Test function to get engineer role
describe("getRole", () => {
    it("Gets engineer role when getRole function is called", () => {
        // Declare variables for role and new engineer
        const engineerRole = "Engineer";
        const newEngineer = newEngineer("Emily", 200, "random@test.com", "githubUsername");
        // Expect function to return engineer role
        expect(newEngineer.getRole()).toBe(engineerRole);
    });
});