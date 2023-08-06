import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ServiceService } from '@/services/service.service';
import { Services } from '@/interfaces/services.interface';

export class ServiceController {
  public service = Container.get(ServiceService);

  public getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllServicesData: Services[] = await this.service.findAllService();

      res.status(200).json({ data: findAllServicesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getServiceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceId: string = req.params.id;
      const findOneServiceData: Services = await this.service.findServiceById(serviceId);

      res.status(200).json({ data: findOneServiceData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceData: Services = req.body;

      const createServiceData: Services = await this.service.createService(serviceData);
      res.status(201).json({ data: createServiceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceId: string = req.params.id;
      const serviceData: Services = req.body;

      const updateServiceData: Services = await this.service.updateService(serviceId, serviceData);

      res.status(200).json({ data: updateServiceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceId: string = req.params.id;
      const deleteServiceData: Services = await this.service.deleteService(serviceId);

      res.status(200).json({ data: deleteServiceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
