const {connection} = require(""../../db-connection");

class Users {

  
  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM users WHERE email=?"
    const [results] = await connection.promise().query(sql,[email])
    return results.length !==0;
  }


}