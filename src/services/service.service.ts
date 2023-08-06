import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ServiceModel } from '@/models/services.model';
import { Services } from '@/interfaces/services.interface';

@Service()
export class ServiceService {
  public async findAllService(): Promise<Services[]> {
    const services: Services[] = await ServiceModel.find().populate({ path: 'clinicID', select: 'name' });
    return services;
  }

  public async findServiceById(ServiceId: string): Promise<Services> {
    const findService: Services = await ServiceModel.findOne({ _id: ServiceId }).populate({ path: 'clinicID', select: 'name' });
    if (!findService) throw new HttpException(409, "Service doesn't exist");

    return findService;
  }

  public async createService(ServiceData: Services): Promise<Services> {
    const findService: Services = await ServiceModel.findOne({ name: ServiceData.name });
    if (findService) throw new HttpException(409, `This name ${ServiceData.name} already exists`);

    const createServiceData: Services = await ServiceModel.create(ServiceData);

    return createServiceData;
  }

  public async updateService(ServiceId: string, ServiceData: Services): Promise<Services> {
    if (ServiceData.name) {
      const findService: Services = await ServiceModel.findOne({ name: ServiceData.name });
      if (findService && findService._id != ServiceId) throw new HttpException(409, `This name ${ServiceData.name} already exists`);
    }

    const updateServiceById: Services = await ServiceModel.findByIdAndUpdate(new Object(ServiceId), ServiceData, { new: true });
    if (!updateServiceById) throw new HttpException(409, "Service doesn't exist");

    return updateServiceById;
  }

  public async deleteService(ServiceId: string): Promise<Services> {
    const deleteServiceById: Services = await ServiceModel.findByIdAndDelete(ServiceId);
    if (!deleteServiceById) throw new HttpException(409, "Service doesn't exist");

    return deleteServiceById;
  }
}
