import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingusers', mocksController.mockingUsuarios);
router.get('/mockingpets', mocksController.mockingMascotas);
router.post('/generateData', mocksController.generarDatos);

export default router;


