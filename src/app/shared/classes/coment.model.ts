import { IComent } from '../interfaces/coment.interface';

export class Coment implements IComent {
    constructor(
        public id: string,
        public date: number = Date.now(),
        public name: string,
        public email: string,
        public text: string
    ) {}
}
