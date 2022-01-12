const { connection } = require("../../db-connection");

class Projects {
  //pour le GET
  static findAll() {
    const sql = "SELECT * FROM projects";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
  const sql = "SELECT * FROM projects WHERE id=?";
  return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM projects WHERE name=?";
    return connection.promise().query(sql, [name]);
  }

  //pour le post: création nouveau projet
static createOne(project) {
  const sql = "INSERT INTO projects SET ?";
  return connection.promise().query(sql,[project]);
}

// pour le put: modification projet
static updateOne(project,id) {
  const sql ="ALTER TABLE projects WHERE id=?";
  return connection.promise().query(sql,[project, id]);
}

// pour le delete: suppression projet
static deleteOneById(id) {
  const sql = "DELETE FROM projects WHERE id=?";
  return connection.promise().query(sql,[id]);
}
}

module.exports = Projects;
