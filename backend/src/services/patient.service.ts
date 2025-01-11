import prisma from '../prisma.js';

class PatientService {
    async getAllPatients() {
        try{
            return prisma.patient.findMany();
        }
        catch(err){
            console.log(err);
        }
    }

    async getPatientById(id: number) {
        return prisma.patient.findUnique({ where: { id } });
    }

    async createPatient(data: any) {
        return prisma.patient.create({ data });
    }

    async updatePatient(id: number, data: any) {
        return prisma.patient.update({ where: { id }, data });
    }

    async deletePatient(id: number) {
        return prisma.patient.delete({ where: { id } });
    }
}

export default new PatientService();
