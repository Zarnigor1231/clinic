import { Admin } from '@/interfaces/admins.interfaces';
import { model, Schema, Document } from 'mongoose';

const AdminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AdminModel = model<Admin & Document>('Admin', AdminSchema);
