/* Replace with your SQL commands */
CREATE TABLE `projects` (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(255) NOT NULL,
    project_description TEXT NOT NULL,
    projet_link VARCHAR(255)  NOT NULL,
    datecreated DATETIME NOT NULL,
    project_date DATETIME NOT NULL
)