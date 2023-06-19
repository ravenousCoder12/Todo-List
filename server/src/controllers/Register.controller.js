import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
// import JWT_TOKEN_SECRET from "../utils/constants.js";   (we can write the above in this way also when you use default while exporting JWT_TOKEN_SECRET from constants.js)
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, username, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({
      $or: [{ email: req.body.email }, { username: username }],
    });

    if (userExists) {
      return res.json(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          "user or email already exists"
        )
      );
    }

    //save to db

    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });

      const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

      return res.json(
        jsonGenerate(statusCode.SUCCESS, "Registration successful", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(jsonGenerate(statusCode.SERVER_ERROR, "Server error"));
    }
  }

  return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "validation error", errors.mapped()));
};

export default Register;
