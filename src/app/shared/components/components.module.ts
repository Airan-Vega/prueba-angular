import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ModalFormComponent],
})
export class ComponentsModule {}
