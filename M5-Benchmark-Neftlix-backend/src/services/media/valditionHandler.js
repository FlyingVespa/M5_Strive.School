import { body } from "express-validator";

const mediaValidation = [
  body("Title").exists().withMessage("Name is a mandatory field!").custom(),
  body("Type").exists().withMessage("Surname is a mandatory field!"),
  body("Year")
    .exists()
    .withMessage("Age is a mandatory field!")
    .isInt()
    .withMessage("Age should be an valid number!"),
];

export default mediaValidation;
