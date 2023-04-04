import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appTimeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TimeValidatorDirective,
      multi: true,
    },
  ],
})
export class TimeValidatorDirective implements Validator {
  @Input() opensAt: any;
  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let date1 = new Date('2000-01-01 ' + this.opensAt);
    let date2 = new Date('2000-01-01 ' + control.value);
    if (date1.getTime() >= date2.getTime()) {
      return { validateTime: true };
    } else {
      return null;
    }
  }
}
