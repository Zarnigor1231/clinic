import { Doctor } from '@/interfaces/doctors.interface';
import { Document, Schema, model } from 'mongoose';

const DoctorSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  file: {
    type: String,
    required: true,
  },
  serviceID: {
    type: String,
    require: true,
    ref: 'Service',
  },
  clinicID: {
    type: String,
    required: true,
    ref: 'Clinic',
  },
  schedule: {
    type: String,
    required: true,
  },
  isDay: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  startWork: {
    type: String,
    required: true,
  },
});

export const DoctorModel = model<Doctor & Document>('Doctor', DoctorSchema);
