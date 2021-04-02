USE employment_DB;

INSERT INTO department (id, dept_name)
VALUES (1, "Brooklyn"),(2, "Chicago"), (3, "Phoenix");

INSERT INTO employeerole (id, role_name, salary, department_id)
VALUES (1, "Officer", 500.00, 2), (2, "Detective", 700.00, 2), (3, "Captain", 500.00, 3), (4, "Chief", 700.00, 3), (5, "Rookie", 500.00, 1), (6, "Criminal", 700.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jake", "Peralta", 2, 0), (2, "Amy", "Santiago", 5, 1), (3, "Rosa", "Diaz", 4, 0), (4, "Terry", "Jeffords", 4, 3), (5, "Ray", "Holt", 3, 3), (6, "Charles", "Boyle", 2, 0), (7, "Gina", "Linetti", 2, 6), (8, "Doug", "Judy", 6, 6);
