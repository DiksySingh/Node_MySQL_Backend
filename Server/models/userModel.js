const pool = require("../config/db");
const bcrypt = require("bcrypt");

const checkEmail = async (email) => {
    const checkEmailSql = "SELECT COUNT(*) AS count FROM user_info WHERE email = ?";
    const [rows] = await pool.execute(checkEmailSql, [email]);
    console.log(rows[0].count);
    return rows[0].count > 0;
}

const createNewUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 5);
    const insertSql = 'INSERT INTO user_info (name, email, password) VALUES (?, ?, ?)';
    const [result] = await pool.execute(insertSql, [name, email, hashedPassword]);
    return result.insertId;
}

module.exports = {
    checkEmail,
    createNewUser
};