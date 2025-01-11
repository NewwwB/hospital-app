import { Router } from 'express';
import PatientController from '../controllers/patient.controller.js';
import {authenticate, authorizeRole} from "../middlewares/auth.middleware.js";
import AuthController from "../controllers/auth.controller";

const router = Router();

// Patient routes
router.get('/',authenticate ,  PatientController.getAllPatients);
router.get('/:id',authenticate ,PatientController.getPatientById);
router.post('/',authenticate , authorizeRole('admin'), PatientController.createPatient);
router.put('/:id',authenticate , PatientController.updatePatient);
router.delete('/:id',authenticate , PatientController.deletePatient);

export default router;
