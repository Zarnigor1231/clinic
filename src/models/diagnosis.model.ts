import { Diagnosis } from '@/interfaces/diagnosis.interface';
import { model, Schema, Document } from 'mongoose';

const DiagnosisSchema: Schema = new Schema({
  customerID: {
    type: String,
    required: true,
    ref: 'Customer',
  },
  diagnosText: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

export const DiagnosisModel = model<Diagnosis & Document>('Diagnosis', DiagnosisSchema);
