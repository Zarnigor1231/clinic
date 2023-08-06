import { Clinic } from '@/interfaces/clinics.interface';
import { Document, Schema, model } from 'mongoose';

const ClinicSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  files: {
    type: [String],
    required: true,
  },
  callSenter: {
    type: [String],
    require: true,
  },
});

export const ClinicModel = model<Clinic & Document>('Clinic', ClinicSchema);
