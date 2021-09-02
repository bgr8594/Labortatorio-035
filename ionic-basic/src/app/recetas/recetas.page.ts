import { Component, OnInit } from '@angular/core';
import { Receta } from './recetas.models';
import { RecetasService } from './recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  receta: Receta[];
  constructor(private recetasService: RecetasService) { }

  ngOnInit() {
    this.receta = this.recetasService.getRecetas();
  }

}
