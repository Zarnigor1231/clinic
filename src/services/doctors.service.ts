import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { Doctor } from '@/interfaces/doctors.interface';
import { DoctorModel } from '@/models/doctors.model';

@Service()
export class DoctorService {
  public async findAllDoctor(serviceID: string, clinicID: string, doctorName: string): Promise<Doctor[]> {
    if (doctorName) {
      const name: string = doctorName.toLocaleLowerCase();

      const doctor: Doctor[] = await DoctorModel.find({ $and: [{ clinicID }, { serviceID }] });

      const doctorArr: Doctor[] = [];

      for (let i = 0; i < doctor.length; i++) {
        if (doctor[i].firstName.includes(name) || doctor[i].lastName.includes(name)) {
          doctorArr.push(doctor[i]);
        }
      }

      if (!doctor) throw new HttpException(409, "doctors doesn't exist");
      const doctors: Doctor[] = doctorArr.length ? doctorArr : doctor;

      return doctors;
    }
    const findDoctor: Doctor[] = await DoctorModel.find({ $and: [{ clinicID }, { serviceID }] });
    if (!findDoctor) throw new HttpException(409, "doctors doesn't exist");

    return findDoctor;
  }

  public async findDoctorById(doctorId: string): Promise<Doctor> {
    const findDoctor: Doctor = await DoctorModel.findOne({ _id: doctorId })
      .populate({ path: 'serviceID', select: 'name' })
      .populate({ path: 'clinicID', select: 'name' });
    if (!findDoctor) throw new HttpException(409, "Doctor doesn't exist");

    return findDoctor;
  }

  public async createDoctor(doctorData: Doctor, file?: any): Promise<Doctor> {
    const findDoctor: Doctor = await DoctorModel.findOne({ phone: doctorData.phone });
    if (findDoctor) throw new HttpException(409, `This phone ${doctorData.phone} already exists`);

    if (file) {
      let imgPath = `/${Date.now()}${file.originalname}`;
      imgPath = imgPath.replace(/\s/g, '');

      const sharpFile = await sharp(file.buffer).resize({ width: 250, height: 250 }).png();
      writeFile(path.join(__dirname, `../upload/doctor`, imgPath), sharpFile);

      doctorData.file = imgPath;
    }

    const createdoctorData: Doctor = await DoctorModel.create({
      ...doctorData,
      firstName: doctorData.firstName.toLowerCase(),
      lastName: doctorData.lastName.toLowerCase(),
    });

    return createdoctorData;
  }

  public async updateDoctor(doctorId: string, doctorData: Doctor, file?: any): Promise<Doctor> {
    const findDoctor = await DoctorModel.findOne({ _id: doctorId });

    if (!findDoctor) throw new HttpException(409, "Doctor doesn't exist");
    const fileDelete = findDoctor?.file;

    if (file && fileDelete) {
      const directoryPath = path.join(__dirname, '../upload/doctor');

      fs.unlink(directoryPath + fileDelete);

      if (file) {
        let imgPath = `/${file.originalname}`;
        imgPath = imgPath.replace(/\s/g, '');

        const sharpFile = await sharp(file.buffer).resize({ width: 250, height: 250 }).png();
        writeFile(path.join(__dirname, `../upload/doctor`, imgPath), sharpFile);

        doctorData.file = imgPath;
      }

      if (doctorData.phone) {
        const findDoctor: Doctor = await DoctorModel.findOne({ phone: doctorData.phone });
        if (findDoctor && findDoctor._id != doctorId) throw new HttpException(409, `This phone ${doctorData.phone} already exists`);
      }

      const updateDoctorById: Doctor = await DoctorModel.findByIdAndUpdate(
        new Object(doctorId),
        {
          ...doctorData,
          firstName: doctorData?.firstName?.toLowerCase(),
          lastName: doctorData?.lastName?.toLowerCase(),
        },
        { new: true },
      );
      if (!updateDoctorById) throw new HttpException(409, "Doctor doesn't exist");

      return updateDoctorById;
    }

    const updateDoctorById: Doctor = await DoctorModel.findByIdAndUpdate(
      new Object(doctorId),
      {
        ...doctorData,
        firstName: doctorData?.firstName?.toLowerCase(),
        lastName: doctorData?.lastName?.toLowerCase(),
      },
      { new: true },
    );
    if (!updateDoctorById) throw new HttpException(409, "Doctor doesn't exist");

    return updateDoctorById;
  }

  public async deleteDoctor(doctorId: string): Promise<Doctor> {
    const deleteDoctorFile = await DoctorModel.findById({ _id: doctorId });
    const file = deleteDoctorFile?.file;

    const deleteDoctorById: Doctor = await DoctorModel.findByIdAndDelete(doctorId);
    if (!deleteDoctorById) throw new HttpException(409, "Doctor doesn't exist");

    if (file) {
      const directoryPath = path.join(__dirname, '../upload/doctor');

      const fsPromise = [];
      fsPromise.push(fs.unlink(directoryPath + file));

      await Promise.all(fsPromise);
    }

    return deleteDoctorById;
  }
}
