const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")
const UserModel = require('../../models/user')


const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      next(error);
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
       const encryptedPassword = await bcrypt.hash(password, 12) 
       const user = await new UserModel({
        email : email,
        name:name,
        password : encryptedPassword
       }).save();

       res.status(201).json({message : 'new user signup'});
       
    } catch (error) {
        console.log(error)
        if(error.code === 1100){
            error.message = 'This email is already registered'
            error.statusCode = 409;
        }else{
            error.statusCode = 500;
        }
        
        next(error);
    }
}

module.exports = signUp