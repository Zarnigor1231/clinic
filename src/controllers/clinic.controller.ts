import { Clinic } from '@/interfaces/clinics.interface';
import { ClinicService } from '@/services/clinics.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class ClinicController {
  public Clinic = Container.get(ClinicService);

  public getClinics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllClinicsData: Clinic[] = await this.Clinic.findAllClinic();

      res.status(200).json({ data: findAllClinicsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getClinicDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clinicId: string = req.params.id;
      const departments: string = req.params?.departments;

      const findOneClinicData = await this.Clinic.findClinicDepartments(clinicId, departments);
      if (!findOneClinicData) {
        res.status(404).json({ message: 'the attempt failed' });
      }

      res.status(200).json({ data: findOneClinicData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ClinicData: Clinic = req.body;
      const files = req.files;

      const createClinicData = await this.Clinic.createClinic(ClinicData, files as Express.Multer.File[]);

      res.status(201).json({ data: createClinicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ClinicId: string = req.params.id;
      const ClinicData: Clinic = req.body;
      const files = req?.files;

      const updateClinicData: Clinic = await this.Clinic.updateClinic(ClinicId, ClinicData, files as Express.Multer.File[]);

      res.status(200).json({ data: updateClinicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ClinicId: string = req.params.id;

      const deleteClinicData: Clinic = await this.Clinic.deleteClinic(ClinicId);

      res.status(200).json({ data: deleteClinicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
