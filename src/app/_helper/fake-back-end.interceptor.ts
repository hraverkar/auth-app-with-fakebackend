import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let testuser = { id: 1, username: 'test', password: 'test', firstName: 'Harshal', lastName: 'Raverkar' };
    return of(null).pipe(mergeMap(() => {
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        if (request.body.username === testuser.username && request.body.password === testuser.password) {
          let body = {
            id: testuser.id,
            username: testuser.username,
            firstName: testuser.firstName,
            lastName: testuser.lastName,
            token: 'fake-jwt-token'
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError({ error: { message: 'User and password is incorrect' } });
        }
      }

      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: [testuser] }));
        } else {
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }
      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackEndInterceptor,
  multi: true
}