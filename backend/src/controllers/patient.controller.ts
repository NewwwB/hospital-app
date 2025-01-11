import { Request, Response } from 'express';
import PatientService from '../services/patient.service.js';

class PatientController {
    async getAllPatients(req: Request, res: Response) {
        const patients = await PatientService.getAllPatients();
        res.json(patients);
    }

    async getPatientById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const patient = await PatientService.getPatientById(id);
            if (!patient) {
                res.status(404).json({ message: 'Patient not found' });
                return;
            }
            res.json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }


    async createPatient(req: Request, res: Response) {
        const data = req.body;
        const newPatient = await PatientService.createPatient(data);
        res.status(201).json(newPatient);
    }

    async updatePatient(req: Request, res: Response) {
        const id = Number(req.params.id);
        const data = req.body;
        const updatedPatient = await PatientService.updatePatient(id, data);
        res.json(updatedPatient);
    }

    async deletePatient(req: Request, res: Response) {
        const id = Number(req.params.id);
        await PatientService.deletePatient(id);
        res.status(204).send();
    }
}

export default new PatientController();
