const pool = require("../config/db");
const bcrypt = require("bcrypt");

const checkEmail = async (email) => {
    const checkEmailSql = "SELECT COUNT(*) AS count FROM user_info WHERE email = ?";
    const existingEmail = await pool.execute(checkEmailSql, [email]);
    return existingEmail[0].length > 0;
}

const createNewUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 5);
    const insertSql = 'INSERT INTO user_info (name, email, password) VALUES (?, ?, ?)';
    const [newUser] = await pool.execute(insertSql, [name, email, hashedPassword]);
    return newUser.insertId;
}

module.exports = {
    checkEmail,
    createNewUser
};