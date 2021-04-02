const connection = require("./db");
const inquirer = require("inquirer");


init()

async function init() {
    const {ToDo} = await inquirer.prompt({
        name: "ToDo",
        type: "list",
        message: "What is it you would like to do?",
        choices: ["View all employees", "View all departments", "View all roles", "Add employee", "Add department", "Add role", "Update employee", "Exit"]
    });
    switch (ToDo) {
        case "View all employees":
            viewEmployee()
            break
        case "View all departments":
            viewDepartments()
            break
        case "View all roles":
            viewRoles()
            break
        case "Add employee":
            addEmployee()
            break
        case "Add Department":
            addDepartment()
            break
        case "Add Role":
            addRole()
            break
        case "Update employees":
            updateEmployee()
            break
        default:
            process.exit(0);
    }
}
function viewEmployee() {
    connection.query("Select first_name, last_name, manager_id, role_name, salary", function (err, data) {
        console.table(data);
        init()
    });    
}
function viewDepartments() {
    connection.query("Select dept_name FROM department", function (err, data) {
        console.table(data);
        init()
    });    
}
function viewRoles() {
    connection.query("SELECT role_name, salary, dept_name FROM employeerole LEFT JOIN department ON employeerole.department_id = department.id", function (err, data) {
        console.table(data);
        init()
    });    
}
function addDepartment() {
    inquirer.prompt({
        name: "role_name",
        type: "input",
        message: "What department do you want to add?"
    })
}