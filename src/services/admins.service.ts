import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { AdminModel } from '@/models/admins.model';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { Admin } from '@/interfaces/admins.interfaces';
import { SECRET_KEY } from '@/config';

const createToken = (admin: Admin): TokenData => {
  const dataStoredInToken: DataStoredInToken = admin;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

@Service()
export class AdminService {
  public async findAllAdmin(): Promise<Admin[]> {
    const admins: Admin[] = await AdminModel.find().select({ username: 1, fullName: 1, phone: 1 });
    return admins;
  }

  public async findAdminById(AdminId: string): Promise<Admin> {
    const findAdmin: Admin = await AdminModel.findOne({ _id: AdminId });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async createAdmin(AdminData: Admin): Promise<{ token: string; createAdminData: Admin }> {
    const findAdmin: Admin = await AdminModel.findOne({ username: AdminData.username });
    if (findAdmin) throw new HttpException(409, `This username ${AdminData.username} already exists`);

    const hashedPassword = await hash(AdminData.password, 10);
    const createAdminData: Admin = await AdminModel.create({ ...AdminData, password: hashedPassword });

    const tokenData = createToken({ username: createAdminData.username } as Admin);
    const token = `${tokenData.token}`;

    return { token, createAdminData };
  }

  public async updateAdmin(AdminId: string, AdminData: Admin, Admin: any): Promise<Admin> {
    if (AdminId == Admin._id) {
      if (AdminData.username) {
        const findAdmin: Admin = await AdminModel.findOne({ username: AdminData.username });
        if (findAdmin && findAdmin._id != AdminId) throw new HttpException(409, `This username ${AdminData.username} already exists`);

        const isPasswordMatching: boolean = await compare(AdminData.password, findAdmin.password);
        if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');
      }

      if (AdminData.password) {
        const hashedPassword = await hash(AdminData.password, 10);
        AdminData = { ...AdminData, password: hashedPassword };
      }

      const updateAdminById: Admin = await AdminModel.findByIdAndUpdate(new Object(AdminId), AdminData, { new: true });
      if (!updateAdminById) throw new HttpException(409, "Admin doesn't exist");

      return updateAdminById;
    } else {
      throw new HttpException(409, 'You are not the required admin');
    }
  }

  public async deleteAdmin(AdminId: string, Admin: any): Promise<Admin> {
    if (AdminId == Admin._id) {
      const deleteAdminById: Admin = await AdminModel.findByIdAndDelete(AdminId);
      if (!deleteAdminById) throw new HttpException(409, "Admin doesn't exist");

      return deleteAdminById;
    } else {
      throw new HttpException(409, 'You are not the required admin');
    }
  }
}
