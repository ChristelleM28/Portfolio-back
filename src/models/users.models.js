const { connection } = require("../../db-connection");
const argon2 = require("argon2");

class Users {
  // Pour vérifier si mon email existe déjà
  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    const [results] = await connection.promise().query(sql, [email]);
    console.log("email", results);
    // si le résultat n'est pas vide, je renvois true, sinon false
    return results.length ? true : false;
  }

  // je défini un nombre de caractères mini
  static validatePassword(password) {
    return password.length >= 7;
  }

  //je créée une fonction pour hasher le mot de passe
  static async hashPassword(password) {
    //j'attends la réponse de ma demande de hashage
    const hashedPassword = await argon2.hash(password);
    // je retourne mon mot de passe hashé
    return hashedPassword;
  }

  //je créé une fonction pour vérifier le mot de passe. Je dois lui fournir le mot de psse en clair et le mot de passe hashé
  static async verifyPassword(password, hashedpassword) {
    const validPassword = await argon2.verify(hashedpassword, password);
    return validPassword;
  }

  //pour le GET
  static findAll() {
    const sql = "SELECT id, email FROM users";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM users WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  //pour le post: création nouvel utilisateur
  static createOne(email) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [email]);
  }

  // pour le put: modification de l'utilisateur
  static updateOne(email, id) {
    const sql = "UPDATE users SET ? WHERE id=?";
    return connection.promise().query(sql, [email, id]);
  }

  // pour le delete: suppression de l'utilisateur
  static deleteOneById(id) {
    const sql = "DELETE FROM users WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Users;
