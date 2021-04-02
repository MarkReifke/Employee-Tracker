const connection = require("./db");
const inquirer = require("inquirer");


init()

async function init() {
    const {ToDo} = await inquirer.prompt({
        name: "ToDo",
        type: "list",
        message: "What is it you would like to do?",
        choices: ["View all employees", "View all department", "View all roles", "Add employee", "Add department", "Add role", "Update employee", "Exit"]
    });
    switch (ToDo) {
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break
        case "View all employees":
            viewEmployee()
            break

    }
}