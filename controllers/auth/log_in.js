// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/user");

// const login = async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;

//   try {
//     const user = await User.findOne({ email: email }).exec();
//     if (!user) {
//       const error = new Error("A user with this email could not be found.");
//       error.statusCode = 401;
//       throw error;
//     }
//     loadedUser = user;
//     const isEqual = await bcrypt.compare(password, user.password);
//     if (!isEqual) {
//       const error = new Error("Wrong password!");
//       error.statusCode = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//       {
//         email: loadedUser.email,
//         userId: loadedUser._id.toString(),
//       },
//       "somesupersecretsecret",
//       { expiresIn: "1h" }
//     );
//     res.status(200).json({ token: token});
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };

// module.exports = login;
