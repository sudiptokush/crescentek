import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuModel } from "src/app/model/menu.model";

import { MenuData } from 'src/data/menu.data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selectedMenuId: number = 0;
  menuList: MenuModel[] = MenuData;
  constructor(protected router: Router) { }

  ngOnInit(): void {
  }

  navigate(id: number, route: string) {
    this.selectedMenuId = id;
    this.router.navigate([route]);
  }
}
