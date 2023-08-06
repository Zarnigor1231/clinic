import { Customer } from '@/interfaces/customers.interface';
import { model, Schema, Document } from 'mongoose';

const CustomerSchema: Schema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  doctorID: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export const CustomerModel = model<Customer & Document>('Customer', CustomerSchema);
