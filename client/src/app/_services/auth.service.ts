import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  redirectUrl: string;

  login({ username, password }): Promise<boolean> {
    return new Promise(resolve => {
      let validCredentials: boolean = false;

      // @NOTE: In a normal scenario this check
      // should be performed against a web service:
      if (username === 'john.doe@mail.com' &&
        password === 'letmein') {
        validCredentials = true;
        window.sessionStorage.setItem('token', 'eyJhbGciOi');
      }

      resolve(validCredentials);
    });
  }

  logout(): Promise<boolean> {
    return new Promise(resolve => {
      window.sessionStorage.removeItem('token');
      
      resolve(true);
    });
  }

  get isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem('token');
  }
}