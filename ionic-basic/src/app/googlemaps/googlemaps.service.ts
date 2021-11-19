import { Injectable, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  apiKey: string = environment.apiKeyMaps;
  mapsLoaded : boolean = false;

  constructor() { }


  init(renderer: Renderer2, document: Document){
    return new Promise((resolve, reject) => {
      if(this.mapsLoaded){
        console.log('google is preview loaded');
        resolve(true);
        return;
      }

        const script = renderer.createElement('script');
        script.id = 'googleMaps';
        window['mapInit'] = ()=>{
          this.mapsLoaded = true;
          if(google){
            console.log('google is loaded');
          } else{
            console.log('google is not defined');
          }
          resolve(true);
          return;
        };

        if(this.apiKey){
          script.src = 'https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&callback=mapInit';
        } else{
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
        }
        renderer.appendChild(document.body, script);
    });
  }
}
