import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCompare',
})
export class SearchComparePipe implements PipeTransform {
  transform(value: string, searchInput: string): boolean {
    if (value.toLowerCase().includes(searchInput.trim().toLowerCase())) {
      return true;
    }

    return false;
  }
}
