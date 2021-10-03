import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Data } from '../../models/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public userData: Data[] = [];
  public collectionSize: number = 0;
  public page: number = 1;
  public pageSize: number = 0;
  public loading: boolean = true;

  constructor(private usersService: UsersService) {}

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

  delete(user: Data) {
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

  changePage(event: any) {
    this.page = event;

    this.userData.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.loadUsers();
  }
}
