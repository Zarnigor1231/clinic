import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Clinic } from '@/interfaces/clinics.interface';
import { ClinicModel } from '@/models/clinics.model';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { Doctor } from '@/interfaces/doctors.interface';
import { DoctorModel } from '@/models/doctors.model';
import { Services } from '@/interfaces/services.interface';
import { ServiceModel } from '@/models/services.model';

@Service()
export class ClinicService {
  public async findAllClinic(): Promise<Clinic[]> {
    const clinics: Clinic[] = await ClinicModel.find().select({ name: 1, fullName: 1, phone: 1 });
    return clinics;
  }

  public async findClinicDepartments(
    ClinicId: string,
    departments?: string,
  ): Promise<{ findDoctor?: Doctor[]; findService?: Services[]; findPrices?: Services[] }> {
    if (departments == 'doctors') {
      const findDoctor: Doctor[] = await DoctorModel.find({ clinic: ClinicId });
      if (!findDoctor) throw new HttpException(409, "Clinic doesn't exist");
      return { findDoctor };
    } else if (departments == 'services') {
      const findService: Services[] = await ServiceModel.find({ clinic: ClinicId });
      if (!findService) throw new HttpException(409, "Clinic doesn't exist");

      return { findService };
    } else if (departments == 'prices') {
      const findPrices: Services[] = await ServiceModel.find({ clinic: ClinicId }).select({ name: 1, price: 1 });
      if (!findPrices) throw new HttpException(409, "Clinic doesn't exist");

      return { findPrices };
    }
  }

  public async createClinic(ClinicData: Clinic, files?: Express.Multer.File[]): Promise<Clinic> {
    const findClinic: Clinic = await ClinicModel.findOne({ name: ClinicData.name });
    if (findClinic) throw new HttpException(409, `This name ${ClinicData.name} already exists`);
    const filesArr = [];

    if (files) {
      for (const file of files) {
        let imgPath = `/${Date.now()}${file.originalname}`;
        imgPath = imgPath.replace(/\s/g, '');

        const sharpFile = await sharp(file.buffer).resize({ width: 250, height: 250 }).png();
        writeFile(path.join(__dirname, `../upload/clinic`, imgPath), sharpFile);

        filesArr.push(imgPath);
      }
    }

    const createClinicData: Clinic = await ClinicModel.create({ ...ClinicData, files: filesArr });

    return createClinicData;
  }

  public async updateClinic(ClinicId: string, ClinicData: Clinic, files?: Express.Multer.File[]): Promise<Clinic> {
    const findClinic = await ClinicModel.findOne({ _id: ClinicId });
    if (!findClinic) throw new HttpException(409, "Clinic doesn't exist");
    const filesDelete = findClinic?.files;

    if (files && filesDelete) {
      const directoryPath = path.join(__dirname, '../upload/clinic');

      const fsPromise = [];
      for (const file of findClinic.files) {
        if (!Array.isArray(ClinicData.files)) {
          fsPromise.push(fs.unlink(directoryPath + file));
        } else if (!ClinicData.files.includes(file)) {
          fsPromise.push(fs.unlink(directoryPath + file));
        }
      }

      await Promise.all(fsPromise);
    }

    if (files) {
      ClinicData.files = Array.isArray(ClinicData.files) ? ClinicData.files : [];

      for (const file of files) {
        let imgPath = `/${Date.now()}${file.originalname}`;
        imgPath = imgPath.replace(/\s/g, '');

        const sharpFile = await sharp(file.buffer).resize({ width: 250, height: 250 }).png();
        writeFile(path.join(__dirname, `../upload/clinic`, imgPath), sharpFile);

        ClinicData.files.push(imgPath);
      }
    }

    if (ClinicData.name) {
      const findClinic: Clinic = await ClinicModel.findOne({ name: ClinicData.name });
      if (findClinic && findClinic._id != ClinicId) throw new HttpException(409, `This name ${ClinicData.name} already exists`);
    }

    const updateClinicById: Clinic = await ClinicModel.findByIdAndUpdate(new Object(ClinicId), ClinicData, { new: true });
    if (!updateClinicById) throw new HttpException(409, "Clinic doesn't exist");

    return updateClinicById;
  }

  public async deleteClinic(ClinicId: string): Promise<Clinic> {
    const deleteClinicFiles = await ClinicModel.findById({ _id: ClinicId });
    const files = deleteClinicFiles?.files;

    const deleteClinicById: Clinic = await ClinicModel.findByIdAndDelete(ClinicId);
    if (!deleteClinicById) throw new HttpException(409, "Clinic doesn't exist");

    if (files) {
      const directoryPath = path.join(__dirname, '../upload/clinic');

      const fsPromise = [];
      for (const file of files) {
        fsPromise.push(fs.unlink(directoryPath + file));
      }

      await Promise.all(fsPromise);
    }

    return deleteClinicById;
  }
}
