import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser, IRegisterFormUser } from '../models/users';

const path_url = environment.path_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number = 1) {
    return this.http.get<IUser>(`${path_url}?page=${page}&delay=3`);
  }

  createUser(formData: IRegisterFormUser) {
    return this.http.post<IRegisterFormUser>(`${path_url}`, formData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${path_url}/${id}`);
  }
}
