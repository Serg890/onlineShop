import { IUser } from '../interfaces/admin.interface';

export class User implements IUser {
 constructor(
     public id: number,
     public email: string,
     public password: string
 ) {}
}
