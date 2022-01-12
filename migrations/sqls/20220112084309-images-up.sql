/* Replace with your SQL commands */
ALTER TABLE images ADD projects_id INT not null;
ALTER TABLE images ADD CONSTRAINT fk_images_projects_id FOREIGN KEY(projects_id)
REFERENCES projects(id) ON DELETE CASCADE;