import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';

@NgModule({
  declarations: [NoimagePipe],
  imports: [CommonModule],
  exports: [NoimagePipe],
})
export class PipesModule {}
