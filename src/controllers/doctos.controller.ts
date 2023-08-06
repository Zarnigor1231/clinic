import { Doctor } from '@/interfaces/doctors.interface';
import { DoctorService } from '@/services/doctors.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class DoctorController {
  public Doctor = Container.get(DoctorService);

  public getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceID = req.query.service_id as string;
      const clinicID: string = req.query.clinic_id as string;
      const doctorName: string = req.query.name as string;

      const findAllDoctorsData: Doctor[] = await this.Doctor.findAllDoctor(serviceID, clinicID, doctorName);

      res.status(200).json({ data: findAllDoctorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDoctorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId: string = req.params.id;
      const findOneDoctorData: Doctor = await this.Doctor.findDoctorById(doctorId);

      res.status(200).json({ data: findOneDoctorData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: Doctor = req.body;
      const file = req.file;

      const createDoctorData = await this.Doctor.createDoctor(doctorData, file);

      res.status(201).json({ data: createDoctorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId: string = req.params.id;
      const doctorData: Doctor = req.body;
      const file = req?.file;

      const updateDoctorData: Doctor = await this.Doctor.updateDoctor(doctorId, doctorData, file);
      console.log(updateDoctorData);

      res.status(200).json({ data: updateDoctorData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId: string = req.params.id;

      const deleteDoctorData: Doctor = await this.Doctor.deleteDoctor(doctorId);

      res.status(200).json({ data: deleteDoctorData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
