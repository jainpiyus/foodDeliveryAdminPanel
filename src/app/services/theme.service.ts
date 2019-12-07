import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public darkThemeEnable = new BehaviorSubject(false);
  public themeColor = new BehaviorSubject('candy');
  constructor() { }
}
