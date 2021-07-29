import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private config = {
    apiUrl: "http://localhost:4000"
  }
  constructor(private httpClient: HttpClient) { }
  login(username: string, password: string) {
    return this.httpClient.post<any>(
      this.config.apiUrl + '/users/authenticate', {
      username, password
    }).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
