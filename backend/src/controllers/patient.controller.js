var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PatientService from '../services/patient.service.js';
class PatientController {
    getAllPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield PatientService.getAllPatients();
            res.json(patients);
        });
    }
    getPatientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const patient = yield PatientService.getPatientById(id);
                if (!patient) {
                    res.status(404).json({ message: 'Patient not found' });
                    return;
                }
                res.json(patient);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
    createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const newPatient = yield PatientService.createPatient(data);
            res.status(201).json(newPatient);
        });
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = req.body;
            const updatedPatient = yield PatientService.updatePatient(id, data);
            res.json(updatedPatient);
        });
    }
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield PatientService.deletePatient(id);
            res.status(204).send();
        });
    }
}
export default new PatientController();
