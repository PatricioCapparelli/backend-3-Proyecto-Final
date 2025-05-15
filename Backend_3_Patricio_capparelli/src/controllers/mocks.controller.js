import generarUsuarios from '../utils/userMock.js';
import generarMascotas from '../utils/petMock.js';
import { usersService, petsService } from '../services/index.js';

const mocksController = {
    mockingUsuarios: async (req, res) => {
        try {
            const cantidad = parseInt(req.query.cantidad) || 50; // Valor por defecto de 50 si no se especifica
            const usuarios = await generarUsuarios(cantidad);
            res.json({ estado: "éxito", cantidad: usuarios.length, datos: usuarios });
        } catch (error) {
            res.status(500).json({ estado: "error", error: error.message });
        }
    },

    mockingMascotas: async (req, res) => {
        try {
            const cantidad = parseInt(req.query.cantidad) || 50; // Valor por defecto de 50 si no se especifica
            const mascotas = generarMascotas(cantidad);
            res.json({ estado: "éxito", cantidad: mascotas.length, datos: mascotas });
        } catch (error) {
            res.status(500).json({ estado: "error", error: error.message });
        }
    },

    generarDatos: async (req, res) => {
        try {
            const { usuarios: cantidadUsuarios = 50, mascotas: cantidadMascotas = 50 } = req.body;

            if (isNaN(cantidadUsuarios) || isNaN(cantidadMascotas)) {
                return res.status(400).json({ estado: "error", error: "Los parámetros 'usuarios' y 'mascotas' deben ser números." });
            }

            const usuariosGenerados = await generarUsuarios(parseInt(cantidadUsuarios));
            const mascotasGeneradas = generarMascotas(parseInt(cantidadMascotas));

            const usuariosGuardados = await Promise.all(usuariosGenerados.map(usuario => usersService.save(usuario)));
            const mascotasGuardadas = await Promise.all(mascotasGeneradas.map(mascota => petsService.save(mascota)));

            res.json({
                estado: "éxito",
                mensaje: "Datos generados e insertados con éxito",
                usuariosGenerados: usuariosGuardados.length,
                mascotasGeneradas: mascotasGuardadas.length
            });
        } catch (error) {
            console.error('Error al generar datos:', error);
            res.status(500).json({ estado: "error", error: error.message });
        }
    }
};

export default mocksController;