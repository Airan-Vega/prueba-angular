import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from '../models/users';

const path_url = environment.path_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number = 1) {
    return this.http.get<IUser>(`${path_url}/api/users?page=${page}&delay=3`);
  }
}
