import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js"; // Añadimos la importación de createHash

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validación de campos requeridos
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ status: "error", error: "Todos los campos son requeridos" });
        }

        // Verificar si el usuario ya existe
        const existingUser = await usersService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ status: "error", error: "El usuario ya existe" });
        }

        // Crear hash de la contraseña
        const hashedPassword = await createHash(password);

        // Crear el nuevo usuario
        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: 'user' 
        };

        const result = await usersService.create(newUser);

        res.status(201).json({ 
            status: "success", 
            message: "Usuario creado exitosamente", 
            payload: { id: result._id, email: result.email } 
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ status: "error", error: "Error interno del servidor" });
    }
};

// Exportamos todas las funciones
export default {
    getUser,
    createUser,
    // Añade aquí las demás funciones del controlador
    getAllUsers: async (req, res) => {
        try {
            const users = await usersService.getAll();
            res.send({ status: "success", payload: users });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).send({ status: "error", error: "Error interno del servidor" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.uid;
            const updateData = req.body;
            
            const updatedUser = await usersService.update(userId, updateData);
            if (!updatedUser) return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
            
            res.send({ status: "success", payload: updatedUser });
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.status(500).send({ status: "error", error: "Error interno del servidor" });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.uid;
            const result = await usersService.delete(userId);
            if (!result) return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
            
            res.send({ status: "success", message: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).send({ status: "error", error: "Error interno del servidor" });
        }
    }
};