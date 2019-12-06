import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/admin-product.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: IProducts[], search: string): any {
    if (!value) { return []; }
    if (!search) { return value; }
    return value.filter(
      val => val.categoryName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      val.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      val.description.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }
  }


