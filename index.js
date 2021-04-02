const connection = require("./db");
const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");


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
    .then((data) => {
        connection.query('INSERT INTO department SET ?', data)
        init()
    });
}
function addRole() {
    connection.query('SELECT * FROM department').then((data) => {
        const deptChoice = [];
        data.forEach(choice => deptChoice.push(choice.dep_name))
        inquirer.prompt([
            {
                name: "role_name",
                type: "input",
                message: "What is the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "deptName",
                type: "list",
                message: "What department would you like to add this role to?",
                choices: deptChoices
            }
        ])
            .then((answers) => {
                let dept_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.deptName === data[i].dept_name) {
                       dept_id = data[i].id
                    }
            }
            connection.query('INSERT INTO employeerole SET ?',
                {
                    role_name: answers.role_name,
                    salary: answers.salary,
                    department_id: dept_id
                })

            init()            
        })
    })        
}
function addEmployee() {
    connection.query('SELECT * FROM employeerole').then((data) => {
        const roleChoice = [];
        data.forEach(choice => roleChoice.push(choice.role_name))
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "First name of employee you want to add?"
            },
            {
                name: "last_name",
                type: "input",
                message: "Last name of employee you want to add?"
            },
            {
                name: "roleName",
                type: "list",
                message: "What role would you like to add this employee to?",
                choices: roleChoices
            },
            {
                name: "manager_id",
                type: "list",
                message: "What is the manager ID?",
                
            }
        ])
            .then((answers) => {
                let role_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.roleName === data[i].role_name) {
                       role_id = data[i].id
                    }
            }
            let manager_id = "";
            if (answers.manager_id === "") {
                manager_id = 0 
            }else {
                manager_id = answers.manager_id
            }
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: role_id,
                    manager_id: manager_id
                },
            )    

            init()            
        })
    })        
}
function updateEmployee() {
    connection.query("SELECT * FROM employeerole").then((data) => {
        const roleChoices = [];
        data.forEach(choice => roleChoices.push(choice.role_name))
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of the employee being updated?"
            },
            {
                name: "roleName",
                type: "list",
                message: "What role would you like to put this employee to?",
                choices: roleChoices
            }
        ])
            .then((answers) => {
                let role_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.roleName === data[i].role_name) {
                        role_id = data[i].id
                    }
                }
                connection.query('UPDATE employee SET ? WHERE ?',
                    [{
                        role_id: role_id,
                    },
                    {
                        first_name: answers.first_name
                    }],
                )

                init()
            })
    })

}
