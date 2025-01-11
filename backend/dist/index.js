import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import patientRoutes from './routes/patient.routes.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// CORS configuration to allow requests from localhost:3000
app.use(cors());
// Handle preflight requests (OPTIONS)
// app.options('*', cors());
// Middleware
app.use(bodyParser.json());
// Routes
app.use('/api/patients', patientRoutes);
// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});