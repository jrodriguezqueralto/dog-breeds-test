import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(values: number[], arg: any): number[] {
    return values.filter((value) => value <= arg);
  }

}
