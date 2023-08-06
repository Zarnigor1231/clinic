import { Services } from '@/interfaces/services.interface';
import { model, Schema, Document } from 'mongoose';

const ServiceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  clinicID: {
    type: String,
    required: true,
    ref: 'Clinic',
  },
});

export const ServiceModel = model<Services & Document>('Service', ServiceSchema);
