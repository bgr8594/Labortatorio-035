import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../recetas/receta.model';
import { RecetasService } from '../recetas/recetas.service';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {
  receta: Receta;
  idReceta : number;
  constructor(
    private recetaService: RecetasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.idReceta = Number.parseInt(paramMap.get('idReceta'));
      this.receta = this.recetaService.getReceta(this.idReceta);
    });
  }

}
