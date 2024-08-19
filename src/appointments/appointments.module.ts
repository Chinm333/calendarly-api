import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentSchema } from 'src/Schemas/appointment.schema';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Appointment', schema: AppointmentSchema }]),
    CommonModule
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule { }
