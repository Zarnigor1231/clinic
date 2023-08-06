export interface Queues {
  _id: string;
  clinicID: string;
  doctorID: string;
  queue: number;
  room: number;
  floor: number;
  userID: string;
  check: number;
  date: string;
  createdAt: Date;
}
