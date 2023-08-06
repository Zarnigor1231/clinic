import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Diagnosis } from '@/interfaces/diagnosis.interface';
import { DiagnosisModel } from '@/models/diagnosis.model';
import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import path from 'path';

@Service()
export class DiagnosisService {
  public async findDiagnosisById(DiagnosisId: string): Promise<Diagnosis> {
    const findDiagnosis: Diagnosis = await DiagnosisModel.findOne({ _id: DiagnosisId }).populate({ path: 'customerID' });

    if (!findDiagnosis) throw new HttpException(409, "Diagnosis doesn't exist");

    return findDiagnosis;
  }

  public async createDiagnosis(DiagnosisData: Diagnosis, file: any): Promise<Diagnosis> {
    const findDiagnosis: Diagnosis = await DiagnosisModel.findOne({ diagnosText: DiagnosisData.diagnosText });
    if (findDiagnosis) throw new HttpException(409, `This diagnos Text ${DiagnosisData.diagnosText} already exists`);

    if (file) {
      let imgPath = `/${Date.now()}${file.originalname}`;
      imgPath = imgPath.replace(/\s/g, '');

      const sharpFile = await sharp(file.buffer).resize({ width: 250, height: 250 }).png();
      writeFile(path.join(__dirname, `../upload/diagnos`, imgPath), sharpFile);

      DiagnosisData.file = imgPath;
    }

    const createDiagnosisData: Diagnosis = await DiagnosisModel.create({ ...DiagnosisData });

    return createDiagnosisData;
  }
}
