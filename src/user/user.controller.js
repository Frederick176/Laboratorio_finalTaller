import { error } from "console"
import User from "./user.model.js"
import { hash, verify } from "argon2"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const initializeAdmin = async () => {
    try{
        const adminExists = await User.findOne({role: "ADMIN_ROLE"})
        if(!adminExists) {
            const hashedPassword = await hash("Frederick053!!*")

            const adminUser = {
                username: "frederick",
                email: "fhernandez-2023176@kinal.edu.gt",
                phone: "12345678",
                name: "Fredy",
                surname: "Hernández",
                password: hashedPassword,
                role: "ADMIN_ROLE"
            }
            const admin = new User(adminUser)
            await admin.save()
            console.log("Administrador creado exitosamente")
        }else {
            console.log("El administrador que estas intentando crear ya existe")
        }
    }catch(err){
        console.log("Error al crear al administrador:", err)
    }
}

initializeAdmin()

export const createUser = async (req, res) => {
    try{
        const data = req.body

        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword

        const user = await User.create(data)

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            name: user.name,
            email: user-email
        })

    }catch(err) {
        return res.status(500).json({
            message: "Error al crear al usuario",
            error: err.message
        })
    }
}

export const modifyRole = async (req, res) => {
    try{
        const { role } = req.body

        const user = await User.findByIdAndUpdate({ role }, { new: true})

        return res.status(200).json({
            message: "El rol del usuario modificado exitosamente",
            user
        })
    }catch(err){
        return res.status(500).json ({
            message: "Error al modificar el rol del usuario",
            error: err.message
        })
    }
} 