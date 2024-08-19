import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Appointment } from 'src/Schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel('Appointment') private readonly appointmentRepository: Model<Appointment>,
        private commonService: CommonService,
    ) { }

    async createAppointment(appointment: Appointment): Promise<Appointment> {
        try {
            appointment.appointmentId = this.commonService.generateId(4);
            const createdAppointment = await this.appointmentRepository.create(appointment);
            return createdAppointment;
        } catch (error) {
            console.error(error);
        }
    }

    async getAppointment(email?: string, date?: Date): Promise<Appointment[]> {
        const query: any = {};

        if (email) {
            query.$or = [
                { createdBy: email },
                { attendees: email }
            ];
        }

        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            query.startTime = { $gte: start, $lt: end };
        }

        return this.appointmentRepository.find(query).sort({ startTime: 1 });
    }

    async updateAppointment(appointment: Appointment): Promise<Appointment> {
        try {
            const updatedAppointment = await this.appointmentRepository.findOneAndUpdate(
                { appointmentId: appointment.appointmentId },
                appointment,
                { new: true },
            );
            return updatedAppointment;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAppointment(appointmentId: string): Promise<Appointment> {
        try {
            const deletedAppointment = await this.appointmentRepository.findOneAndDelete({
                appointmentId: appointmentId,
            });
            return deletedAppointment;
        } catch (error) {
            console.error(error);
        }
    }
}
