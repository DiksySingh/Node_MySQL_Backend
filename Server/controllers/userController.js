const userModel = require("../models/userModel");

const userSignUp = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingEmailId = await userModel.checkEmail(email);
        console.log(existingEmailId);
        if(existingEmailId){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const userId = await userModel.createNewUser(name, email, password);
        return res.status(200).json({
            success: true,
            message: "User inserted successfully",
            data: {
                id: userId,
                name: name,
                email: email
            }
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
} 

module.exports = {
    userSignUp
};