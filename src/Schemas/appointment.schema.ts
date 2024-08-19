import { Schema, Document } from 'mongoose';

export const AppointmentSchema = new Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    attendees: [{
        type: String,
        ref: 'User',
    }],
    createdBy: {
        type: String,
        ref: 'User',
        required: true,
    },
    isAllDay: {
        type: Boolean,
        default: false,
    },
    reminders: [{
        type: String,
        enum: ['email', 'popup'],
    }],
    recurrence: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', 'none'],
        default: 'none',
    },
    status: {
        type: String,
        enum: ['confirmed', 'tentative', 'cancelled'],
        default: 'confirmed',
    },
}, { timestamps: true });

export interface Appointment extends Document {
    appointmentId: string;
    title: string;
    description?: string;
    location?: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
    createdBy: string;
    isAllDay: boolean;
    reminders?: string[];
    recurrence: string;
    status: string;
}

AppointmentSchema.index({ appointmentId: "text", createdBy: "text", status: "text" })