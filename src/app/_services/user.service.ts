import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private config ={
    apiUrl:"http://localhost:4000"
  } 

  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<User[]>(
      this.config.apiUrl+'/users'
    );
  }
}
