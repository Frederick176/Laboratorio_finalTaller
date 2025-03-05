import User from "../user/user.model.js"

export const updateUser = async (req, res) => {
    try{
        const { uid } = req.params
        const data = req.body

        const currentUser = await User.findById(req.user.id)

        if(data.role && currentUser.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Lo siento, no tienes permiso para cambiar el rol"
            })
        }

        const updateUser = await User.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true,
            message: "El usuario actualizado exitosamente",
            user: updateUser
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actalizar al usuario",
            error: err.message
        })
    }
}

export const getUser = async (req, res) => {
    try{
        const user = await User.find()

        res.status(200).json({
            success: true,
            message: "Usuario administrador, usuarios obtenidos",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            err
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req.params

        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "Lo siento no estas autenticado"
            })
        }

        if(req.user.id !== uid) {
            return res.status(403).json({
                success: false,
                message: "Lo siento no tienes permiso para eliminar de eliminar"
            })
        }

        const deletedUser = await User.findByIdAndDelete(uid)
        if(!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            message: "Usuario eliminado exitosamente",
            user: deletedUser
        })
        
    }catch(err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar al usuario",
            error: err.message
        })
    }
}