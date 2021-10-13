import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../service/lugares.service';
import { Lugar } from '../shared/lugar';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
})
export class DestinosPage implements OnInit {
  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  constructor( private lugarService: LugaresService) { }

  ngOnInit() {
    this.lugarService.getLugares(this.destinos);
  }

  altaLugar(){
    this.lugarService.altaLugar(this.lugar);
    this.lugarService.getLugares(this.destinos);
  }
}
