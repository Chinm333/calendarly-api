import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { Appointment } from 'src/Schemas/appointment.schema';
import { AppointmentsService } from './appointments.service';

@Controller('api/appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ) { }
    @Post()
    async createAppointment(@Body() appointment: Appointment): Promise<Appointment> {
        return this.appointmentsService.createAppointment(appointment);
    }
    @Get()
    async getAppointments(
        @Query('email') email?: string,
        @Query('date') date?: string,
    ): Promise<Appointment[]> {
        const dateObj = date ? new Date(date) : undefined;
        return this.appointmentsService.getAppointment(email, dateObj);
    }
    @Put()
    async updateAppointment(@Body() appointment: Appointment): Promise<Appointment> {
        return this.appointmentsService.updateAppointment(appointment);
    }
    @Delete()
    async deleteAppointment(@Query('appointmentId') appointmentId: string): Promise<Appointment> {
        return this.appointmentsService.deleteAppointment(appointmentId);
    }
}
