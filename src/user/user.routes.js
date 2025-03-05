import { Router } from "express";
import { updateUser, getUser, deleteUser } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { updateProfileValidator } from "../middlewares/user-validator.js";

const router = Router()

router.put("/:uid", validateJWT, updateProfileValidator, updateUser)

router.get("/", validateJWT, getUser)

router.delete("/delete/:uid", validateJWT, deleteUser)

export default router