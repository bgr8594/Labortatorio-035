import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuElementsInterface } from './menu.model';

@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.scss'],
})
export class FloatMenuComponent implements OnInit {
  datosMenu: MenuElementsInterface[] =[
    {nombre: 'Alumnos',enlace:'/alumnos',
    icono:'school-outline'},
    {nombre: 'Receteas',enlace:'/recetas',
    icono:'restaurant-outline'},
    {nombre: 'Tabs',enlace:'/tabs',
    icono:'folder-outline'}
    ];
  constructor(private router: Router) { }

  ngOnInit() {}

  navegar(link: string){
    this.router.navigate([link]);
  }
}
