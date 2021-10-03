import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  form: FormGroup;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      job: new FormControl(null, Validators.required),
    });
  }

  save() {
    this.modal.close(this.form.value);
  }
}
