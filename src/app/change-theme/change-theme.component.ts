import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss']
})
export class ChangeThemeComponent implements OnInit {
  darkThemeEnable:boolean;
  themeColor: string[] = ['candy', 'red', 'orange', 'purple', 'brown', 'green'];
  selectedColor: string;
  constructor(private themeService: ThemeService) { 
    this.themeService.darkThemeEnable.subscribe(res =>{
      this.darkThemeEnable = res;
    });
    this.themeService.themeColor.subscribe(res => {
      this.selectedColor = res;
    })
  }

  ngOnInit() {
  }
  darkTheme() {
   if (this.darkThemeEnable) {
     this.themeService.darkThemeEnable.next(false);
   } else {
    this.themeService.darkThemeEnable.next(true);
   }
  }
  changeColor(){
    this.themeService.themeColor.next(this.selectedColor);
  }
}
