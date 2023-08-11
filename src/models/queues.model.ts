import { Queues } from '@/interfaces/queues.interface';
import { model, Schema, Document } from 'mongoose';

const QueueSchema: Schema = new Schema(
  {
    clinicID: {
      type: String,
      required: true,
      ref: 'Clinic',
    },
    doctorID: {
      type: String,
      required: true,
      ref: 'Doctor',
    },
    queue: {
      type: Number,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
      ref: 'User',
    },
    check: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  },
);

// check ko'rik

export const QueueModel = model<Queues & Document>('Queue', QueueSchema);
