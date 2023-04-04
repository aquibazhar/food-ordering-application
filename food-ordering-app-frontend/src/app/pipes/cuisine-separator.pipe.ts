import { Pipe, PipeTransform } from '@angular/core';
import { elementAt } from 'rxjs';

@Pipe({
  name: 'cuisineSeparator',
})
export class CuisineSeparatorPipe implements PipeTransform {
  transform(value: string): string {
    let finalCuisines: string = value.split('  ').join(', ');

    return finalCuisines;
  }
}
