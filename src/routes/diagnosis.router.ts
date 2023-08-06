import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { DiagnosisController } from '@/controllers/diagnosis.controller';
import { CreateDiagnosisDto } from '@/dtos/diagnosis.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { upload } from '@/config/multer';

export class DiagnosisRoute implements Routes {
  public path = '/diagnosis';
  public router = Router();
  public diagnosis = new DiagnosisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.diagnosis.getDiagnosisById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware(['doctor']),
      upload.single('upload'),
      ValidationMiddleware(CreateDiagnosisDto, true),
      this.diagnosis.createDiagnosis,
    );
  }
}
