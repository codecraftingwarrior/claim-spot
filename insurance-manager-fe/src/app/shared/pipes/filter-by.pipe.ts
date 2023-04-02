import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(customArray: any[], object: any): boolean {
    if (customArray.length) {
      return customArray.filter(data => data.id === object.id).length ? true : false;
    }
  }

}
