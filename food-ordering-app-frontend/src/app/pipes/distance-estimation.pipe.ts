import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceEstimation',
})
export class DistanceEstimationPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1) {
      return Math.round(value * 1000) + 'm';
    } else {
      return Math.round(value) + 'km';
    }
  }
}
