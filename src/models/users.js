const {connection} = require(""../../db-connection");

class Users {
// pour le GET
static findAll() {
  const sql = "SELECT * FROM users"
  return connection.promise().query(sql);
}

static findOneById(id) {
  const sql = "SELECT * FROM users WHERE id=?";
  return connection.promise().query(sql,[id]);
}

static findOneByEmail(email) {
  const sql = "SELECT * FROM users WHERE id=?";
  return connection.promise().query(sql,[email]);
}

  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM users WHERE email=?"
    const [results] = await connection.promise().query(sql,[email])
    return results.length !==0;
  }

// pour le POST création nouveau user
  static createOne(user) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql,[user]);  
  }
  
  // pour DELETE un user
static deleteOneById(id) {
  const sql ="DELETE FROM users WHERE id=?";
  return connection.promise().query(sql,[id]);
}
}

module.exports = Users;