import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    return value + ' minute' + (value > 1 ? 's' : '');
  }
}
