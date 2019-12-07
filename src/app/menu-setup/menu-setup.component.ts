import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-setup',
  templateUrl: './menu-setup.component.html',
  styleUrls: ['./menu-setup.component.scss']
})
export class MenuSetupComponent implements OnInit {
  links = [
    {
      label: "Product",
      link: '/menu-setup/products'
    },
    {
      label: "Category",
      link: '/menu-setup/category',
    }
  
  ];
  activeLink = this.links[0];
  background = '';
  constructor() { }

  ngOnInit() {
  }

}
