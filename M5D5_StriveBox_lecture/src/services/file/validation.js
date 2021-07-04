import { body } from "express-validator";

const fileValidation = [
  body("text").exists().withMessage("Name is a mandatory field!").custom(),
];

export default fileValidation;
