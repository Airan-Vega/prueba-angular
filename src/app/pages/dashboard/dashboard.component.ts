import { IFormUser } from './../../models/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Data } from '../../models/users';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../shared/components/modal-form/modal-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public userData: Data[] = [];
  public collectionSize: number;
  public page: number = 1;
  public pageSize: number;
  public loading: boolean = true;
  public newUser: IFormUser[] = [];

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.usersService
      .getUsers(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.userData = users.data;
        this.collectionSize = users.total;
        this.pageSize = users.per_page;
        this.loading = false;
      });
  }

  createUser() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.closed.pipe(first()).subscribe((dataForm: IFormUser) => {
      this.usersService
        .createUser(dataForm)
        .pipe(takeUntil(this.destroy$))
        .subscribe((newUser) => {
          this.newUser.push(newUser);
        });
    });
  }

  deleteUser(user: Data) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${user.first_name} ${user.last_name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService
          .deleteUser(user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            Swal.fire(
              'Usuario borrado',
              `${user.first_name} ${user.last_name} fue eliminado correctamente`,
              'success'
            );
            this.userData = this.userData.filter(
              (users) => users.id !== user.id
            );
          });
      }
    });
  }

  editNewUser(idUser: string, i: number) {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.componentInstance.value = this.newUser[i];
    modalRef.closed.pipe(first()).subscribe((formData: IFormUser) => {
      this.usersService
        .editUser(idUser, formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          this.newUser[i] = resp;
        });
    });
  }

  deleteNewUser(user: IFormUser) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Usuario borrado',
          `${user.name}  fue eliminado correctamente`,
          'success'
        );
        this.newUser = this.newUser.filter((users) => users.id !== user.id);
      }
    });
  }

  changePage(event: any) {
    this.page = event;

    this.userData.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.loadUsers();
  }
}
