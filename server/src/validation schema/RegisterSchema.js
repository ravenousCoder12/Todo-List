import { check } from "express-validator";

export const RegisterSchema = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha()
    .withMessage("Name should only contain alphabets"),

  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username should be alphanumeric characters only")
    .isLength({ min: 6, max: 32 })
    .withMessage(
      "Username should be alphanumeric and between 6 and 32 characters"
    ),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password should be between 6 and 100 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];
