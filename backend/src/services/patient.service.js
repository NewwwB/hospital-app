var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../prisma.js';
class PatientService {
    getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma.patient.findMany();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getPatientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.patient.findUnique({ where: { id } });
        });
    }
    createPatient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.patient.create({ data });
        });
    }
    updatePatient(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.patient.update({ where: { id }, data });
        });
    }
    deletePatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.patient.delete({ where: { id } });
        });
    }
}
export default new PatientService();
