import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePipe'
})
export class NamePipePipe implements PipeTransform {

  transform(items: any, input: any): any {
   if (input) {
      return items.filter((item: any) => item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1);
   } else {
     return items;
   }
  }

}
