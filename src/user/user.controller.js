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
                
            }
        }
    }catch(err){
        console.log("Error al crear al administrador:", err)
    }
}