import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string | undefined, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    return moment(value).fromNow();
  }
}
