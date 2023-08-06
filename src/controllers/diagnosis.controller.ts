import { Diagnosis } from '@/interfaces/diagnosis.interface';
import { DiagnosisService } from '@/services/diagnosis.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class DiagnosisController {
  public diagnosis = Container.get(DiagnosisService);

  public getDiagnosisById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const diagnosisId: string = req.params.id;
      const findOneDiagnosisData: Diagnosis = await this.diagnosis.findDiagnosisById(diagnosisId);

      res.status(200).json({ data: findOneDiagnosisData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDiagnosis = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const diagnosisData: Diagnosis = req.body;
      const file = req.file;

      const createDiagnosisData: Diagnosis = await this.diagnosis.createDiagnosis(diagnosisData, file);

      res.status(201).json({ data: createDiagnosisData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
