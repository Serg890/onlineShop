import { IProducts } from '../interfaces/admin-product.interface';

export class Products implements IProducts {
    constructor(
        public id: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public price: number,
        public img: string,
        public imgID: string,
        public isBought: boolean,
        public counter?: number,
    ) { }
}
