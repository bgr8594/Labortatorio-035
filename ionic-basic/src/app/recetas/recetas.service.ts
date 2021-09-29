import { Injectable } from '@angular/core';
import { Receta } from './recetas.model';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  recetas: Receta[]=[
    {
      id: 1,
      nombre: 'Pizza',
      image: 'https://www.istockphoto.com/es/foto/pizza-de-pepperoni-cheesy-gm938742222-256696208',
      ingredientes: ["queso","salsa","peperoni","harina","especies","sal"]
    },
    {
      id: 2,
      nombre: 'Chop suey de pollo',
      image: 'https://www.istockphoto.com/es/foto/chop-suey-gm97481076-11752725',
      ingredientes: ['2 cucharadas de aceite de ajonjoli','1/2 cebolla fileteada',
      '1 diente de ajo picado finamente',
      '400 gramos de pechuga de pollo',
      '1 calabaza cortada en tiras',
      '2 zanahorias cortadas en tiras']
    },
    {
      id: 3,
      nombre: 'Pollo a la mexicana',
      image: 'https://www.alamyimages.fr/photos-images/arroz-con-pollo-a-la-mexicana.html',
      ingredientes: ['1/2 cebolla asada','2 dientes de ajo asados', '4 jitomates asados',
      '1/2 taza de agua','1/2 cebolla fileteada','2 cucharadas de aceite de maiz']
    },
    {
      id: 4,
      nombre: 'Paletas de fresa',
      image: 'https://www.istockphoto.com/es/foto/paletas-de-yogur-fresa-saludable-vista-a%C3%A9rea-en-m%C3%A1rmol-gm676616296-125560841',
      ingredientes: ['2 tazas de fresas congeladas','1 1/2 tazas de agua',
      '1/2 taza de azucar','8 palitos de madera','8 vasos de plastico']
    }
  ];
  constructor() { }

  getReceta(idReceta: number){
    return{...
      this.recetas.find((receta: Receta)=>{
        return receta.id === idReceta
      })
    };
  }

  getRecetas(){
    return [...this.recetas];
  }
}
