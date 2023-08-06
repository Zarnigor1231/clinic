import { Service } from 'typedi';
import { ServiceModel } from '@/models/services.model';
import { Services } from '@/interfaces/services.interface';

@Service()
export class PriceService {
  public async findAllService(): Promise<Services[]> {
    const services: Services[] = await ServiceModel.find().select({ name: 1, price: 1 });
    return services;
  }
}
