import { body } from "express-validator";
import { usernameExists, emailExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido por favor"),
    body("surname").notEmpty().withMessage("El apellido es requerido por favor"),
    body("username").notEmpty().withMessage("El usuario es requerido por favor"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("El correo electrónico es requerido por favor"),
    body("email").isEmail().withMessage("El correo electrónico no es válido"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
]
