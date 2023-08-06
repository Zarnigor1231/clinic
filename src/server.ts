import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
// import { AdminRoute } from './routes/admins.router';
import { ClinicRoute } from './routes/clinics.router';
import { ServiceRoute } from './routes/services.router';
import { DoctorRoute } from './routes/doctor.router';
import { QueueRoute } from './routes/queues.router';
import { PriceRoute } from './routes/prices.router';
import { CustomerRoute } from './routes/customers.router';
import { DiagnosisRoute } from './routes/diagnosis.router';

ValidateEnv();

const app = new App([
  // new UserRoute(),
  new AuthRoute(),
  // new AdminRoute(),
  new ClinicRoute(),
  new ServiceRoute(),
  new DoctorRoute(),
  new QueueRoute(),
  new PriceRoute(),
  new CustomerRoute(),
  new DiagnosisRoute(),
]);

app.listen();
