import { Injectable } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  loggedIn = new BehaviorSubject(this.user);
  constructor() { }

  isLoggedIn(): boolean {
    return true;
  }
}
