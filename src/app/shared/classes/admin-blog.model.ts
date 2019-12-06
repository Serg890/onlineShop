import { IBlog } from '../interfaces/admin-blog.interface';

export class Blog implements IBlog {
    constructor(
    public id: number,
    public date: any = Date.now(),
    public text: string,
    public img: string,
    public imgID: string
    ) {}
}
