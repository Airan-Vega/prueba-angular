import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Data } from '../../models/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  changePage(event: any) {
    this.page = event;

    this.userData.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.loadUsers();
  }
}
