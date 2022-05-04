const { connection } = require("../../db-connection");

/* A class that is used to create a new project. */
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

  //pour le post: création nouveau projet
static createOne(project) {
  const sql = "INSERT INTO projects SET ?";
  return connection.promise().query(sql,[project]);
}

// pour le put: modification projet
static updateOne(project,id) {
  const sql ="UPDATE projects SET ? WHERE id=?";
  return connection.promise().query(sql,[project, id]);
}

// pour le delete: suppression projet
static deleteOneById(id) {
  const sql = "DELETE FROM projects WHERE id=?";
  return connection.promise().query(sql,[id]);
}
}

module.exports = Projects;
