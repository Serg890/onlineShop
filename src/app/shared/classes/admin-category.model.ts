import { ICategory } from '../interfaces/admin-category.interface';

export class Category implements ICategory {
    constructor(
       public id: number,
       public name: string

    ) {}
}
