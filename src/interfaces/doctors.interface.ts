export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  file: string;
  serviceID: string;
  clinicID: string;
  schedule: string;
  isDay: string;
  roomNo: number;
  startWork: string;
  password?: number;
  login?: string;
}
