import Category from "./category.model.js"

export const addCategory = async (req, res) => {
    try{
        const { name} = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Categoría agregada exitosamente",
            category: newCategory
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al ingresar la categoría',
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const { id } = req.params

        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            })
        }

        let defaultCategory = await Category.findOne({ name: "Sin Categoría" });
        if (!defaultCategory) {
            defaultCategory = new Category({ name: "Sin Categoría" });
            await defaultCategory.save();
        }

        await Product.updateMany({ category: id }, { category: defaultCategory._id });
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Categoria eliminada exitosamente y productos reasignados a sin categoria"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Lo siento no se encontro la categoria"
            })
        }

        category.name = name;
        await category.save();

        res.status(200).json({
            success: true,
            msg: "Categoría actualizada",
            category
        });

    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error al actualizar categoría",
            error: err.message
        });
    }
}

export const getCategorias = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
        
    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error al obtener categorías",
            error: err.message
        });
    }
}