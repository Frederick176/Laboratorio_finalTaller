import { hash, verify } from "argon2";
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try{
        const data = req.body

        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword

        const user = await User.create(data)

        return res.status(201).json({
            message: "El usuario se ha creado exitosamente",
            name: user.name,
            email: user.email   
        })
    }catch(err){
        return res.status(500).json({
            message: "El usurio fallo al registrarlo",
            error: err.message
        })
    }
}

export const login = async(req, res) => {
    const { email, username, password } = req.body;
    console.log("Login request received with:", { email, username, password });

    try{
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        })

        if(!user) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}