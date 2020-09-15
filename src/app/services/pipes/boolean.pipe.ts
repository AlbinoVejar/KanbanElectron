import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: number): boolean {
    if (value === 0){
      return false;
    }
    else if (value === 1){
      return true;
    }
  }

}
