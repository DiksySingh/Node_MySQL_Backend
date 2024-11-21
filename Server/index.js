const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// const pool = mysql2.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

app.get("/", (req, res) => {
    res.send("Working Fine");
});

app.use("/user", authRoutes);

// app.post("/user-signup", async (req, res) => {
//     try {
//         const {name, email, password} = req.body;
//         if(!name || !email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }
        
//         const checkEmailSql = "SELECT COUNT(*) AS count FROM user_info WHERE email = ?";
//         const [rows] = await pool.execute(checkEmailSql, [email]);
//         console.log(rows[0]);
//         if(rows[0].length > 0){
//             return res.status(400).json({
//                 success: false,
//                 message: "Email Already Exists In Database"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 5);
//         console.log(hashedPassword);

//         const sql = "INSERT INTO user_info (name, email, password) VALUES (?, ?, ?)";

//         const result = await pool.execute(sql, [name, email, hashedPassword]);
//         console.log(result);
//         return res.status(200).json({
//             success: true,
//             message: "User inserted successfully",
//             data: {
//                 id: result.insertId,
//                 name: name,
//                 email: email
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// })

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});