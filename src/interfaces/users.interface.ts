export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  young: number;
  phone: number;
  password: string;
  oldPassword?: string;
  login?: string;
}
