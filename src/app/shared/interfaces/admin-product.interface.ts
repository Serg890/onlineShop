export interface IProducts {
    id: number;
    categoryName: string;
    name: string;
    description: string;
    price: number;
    img: string;
    imgID: string;
    isBought: boolean;
    counter?: number;
}
