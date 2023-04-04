import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appAtleastOneCuisineSelectedValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AtleastOneCuisineSelectedValidatorDirective,
      multi: true,
    },
  ],
})
export class AtleastOneCuisineSelectedValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const selectedOptions = control.value;
    return selectedOptions === '' ? null : { atLeastOneSelected: true };
  }
}
