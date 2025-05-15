import express from 'express';
import swaggerUi from 'swagger-ui-express';
import adoptionsRouter from './routes/adoption.router.js';
import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js';
import mocksRouter from './routes/mocks.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import petsRouter from './routes/pets.router.js';
import swaggerSpec from './utils/swaggerConfig.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;
const connection = process.env.MONGODB_URL;


app.use(express.json());
app.use(cookieParser());


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentacion de Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
})
.catch(err => console.error('Error al conectar a MongoDB:', err));


process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
});

export default app;