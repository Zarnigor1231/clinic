import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { DoctorController } from '@/controllers/doctos.controller';
import { CreateDoctorDto, UpdateDoctorDto } from '@/dtos/doctors.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { upload } from '@/config/multer';

export class DoctorRoute implements Routes {
  public path = '/doctor';
  public router = Router();
  public doctor = new DoctorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, AuthMiddleware(['user']), this.doctor.getDoctors);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['user']), this.doctor.getDoctorById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware(['admin']),
      upload.single('upload'),
      ValidationMiddleware(CreateDoctorDto, true),
      this.doctor.createDoctor,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware(['admin']),
      upload.single('upload'),
      ValidationMiddleware(UpdateDoctorDto, true, true),
      this.doctor.updateDoctor,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.doctor.deleteDoctor);
  }
}
