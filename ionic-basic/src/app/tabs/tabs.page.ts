import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AlumnosPage } from '../alumnos/alumnos.page';
import { RecetasPage } from '../recetas/recetas.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
})
export class TabsPage implements OnInit {

tab1 : any = AlumnosPage;
tab2 : any = RecetasPage;

  constructor(private navController: NavController, private navParams :NavParams) { }

  ngOnInit() {
  }

}
