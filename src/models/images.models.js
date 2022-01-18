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

  // static findOneByName(name) {
  //   const sql = "SELECT * FROM projects WHERE project_name=?";
  //   return connection.promise().query(sql, [name]);
  // }

  //pour le post: création nouveau projet
static createOne(image) {
  const sql = "INSERT INTO images SET ?";
  return connection.promise().query(sql,[image]);
}

// pour le put: modification projet
static updateOne(image,id) {
  const sql ="UPDATE images SET ? WHERE id=?";
  return connection.promise().query(sql,[image, id]);
}

// pour le delete: suppression projet
static deleteOneById(id) {
  const sql = "DELETE FROM images WHERE id=?";
  return connection.promise().query(sql,[id]);
}
}

module.exports = Images;
