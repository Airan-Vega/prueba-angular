import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser, IFormUser } from '../models/users';

const path_url = environment.path_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number = 1) {
    return this.http.get<IUser>(`${path_url}?page=${page}&delay=3`);
  }

  createUser(formData: IFormUser) {
    return this.http.post<IFormUser>(`${path_url}`, formData);
  }

  editUser(id: string, formData: IFormUser) {
    return this.http.put<IFormUser>(`${path_url}/${id}`, formData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${path_url}/${id}`);
  }
}
