import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
})
export class NoimagePipe implements PipeTransform {
  transform(images: string): string {
    if (images) {
      return images;
    } else {
      return 'assets/image/noimage.png';
    }
  }
}
