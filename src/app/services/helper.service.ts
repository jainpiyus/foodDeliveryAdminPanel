import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  addressSideNav = new BehaviorSubject(false);
  endSideNav = new BehaviorSubject(false);
  enableAccount = new BehaviorSubject('signin');
  themeSideNav = new BehaviorSubject(false);
  constructor() { }
}
