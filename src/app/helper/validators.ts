import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { patternInvalid: true } : null;
  };
}
