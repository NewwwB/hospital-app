import { Router } from 'express';
import PatientController from '../controllers/patient.controller.js';
const router = Router();
// Patient routes
router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.createPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);
export default router;
