const { connection } = require("../../db-connection");

class Images {
  //pour le GET
  static findAll() {
    const sql = "SELECT * FROM images";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM images WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findImageByProjectId(project_id) {
    const sql = "SELECT * FROM images WHERE projects_id=?";
    return connection.promise().query(sql, [project_id]);
  }

  //pour le post: création nouveau projet
  static createOne(image) {
    const sql = "INSERT INTO images SET ?";
    return connection.promise().query(sql, [image]);
  }

  // pour le put: modification projet
  static updateOne(image, id) {
    const sql = "UPDATE images SET ? WHERE id=?";
    return connection.promise().query(sql, [image, id]);
  }

  // pour le delete: suppression projet
  static deleteOneById(id) {
    const sql = "DELETE FROM images WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Images;
