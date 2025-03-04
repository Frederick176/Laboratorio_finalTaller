import { Schema, model, version } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no se puede pasar de 25 caracteres"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [30, "El apellio no se puede pasar de 30 caracteres"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)