import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    calendar: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
    }],
}, { timestamps: true });

export interface User extends Document {
    userId: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    calendar: string[];
}

UserSchema.index({ userId: "text", username: "text", email: "text" });