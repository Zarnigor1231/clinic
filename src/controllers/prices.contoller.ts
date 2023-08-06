import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Services } from '@/interfaces/services.interface';
import { PriceService } from '@/services/prices.service';

export class PriceController {
  public price = Container.get(PriceService);

  public getPrices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllServicesData: Services[] = await this.price.findAllService();

      res.status(200).json({ data: findAllServicesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
