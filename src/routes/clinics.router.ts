import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ClinicController } from '@/controllers/clinic.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { upload } from '@/config/multer';
import { CreateClinicDto, UpdateClinicDto } from '@/dtos/clinics.dto';

export class ClinicRoute implements Routes {
  public path = '/clinic';
  public router = Router();
  public clinic = new ClinicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['user']), this.clinic.getClinics);
    this.router.get(`${this.path}/:id/:departments`, AuthMiddleware(['user']), this.clinic.getClinicDepartments);

    this.router.post(
      `${this.path}`,
      AuthMiddleware(['admin']),
      upload.array('uploads', 4),
      ValidationMiddleware(CreateClinicDto, true),
      this.clinic.createClinic,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware(['admin']),
      upload.array('uploads', 4),
      ValidationMiddleware(UpdateClinicDto, true, true),
      this.clinic.updateClinic,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.clinic.deleteClinic);
  }
}
