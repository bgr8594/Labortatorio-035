import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LugaresService } from '../services/lugares.service';
import { Lugar } from '../shared/lugar';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
})
export class DestinosPage implements OnInit, OnDestroy {
  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  ionicForm : FormGroup;
  estado: string ="Alta destino";
  editando: boolean= false;
  subscripcion: Subscription;
  latitud : number;
  longitud: number;
  constructor( private lugarService: LugaresService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPosition();
    this.buildForm();
    this.subscripcion = this.lugarService.getLugaresChanges().subscribe(resp => {
      this.destinos = resp.map((e: any) => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          latitud: e.payload.doc.data().latitud,
          longitud: e.payload.doc.data().longitud
        }
      });
    }, error => {
      console.error(error);
    });
    
   /*
   this.subscripcion = this.lugarService.getLugaresApi().subscribe((response: Lugar[])=>{
     this.destinos = response
   }, error=>{
     console.error();
   });
   */
  }

  altaLugar(){
    this.lugarService.altaLugar(this.lugar);
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      this.lugar.latitud = this.latitud;
      this.lugar.longitud = this.longitud; 
      if(!this.editando){
/*  alta de lugar atraves de firestore 
        this.lugarService.altaLugar(this.lugar).then((e:any)=>{
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });    
*/  
// alta de lugar desde api
        this.lugarService.altaLugarApi(this.lugar).subscribe((reponse: any)=>{
          this.ionicForm.reset();
        }, error=>{
          console.log(error);
        });
        
      } else{
/*  consumir editar a traves de firestore
        this.lugarService.updateLugares(this.lugar.id, this.lugar).then(e=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });
*/

// editar desde el api
        this.lugarService.editarLugarApi(this.lugar.id, this.lugar).subscribe((response: any)=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.ionicForm.reset();
        }, error=>{
          console.error(error);
        })
      }
    }
  }

  buildForm(){
    this.ionicForm = this.formBuilder.group({
      nombre: new FormControl('',{validators:[Validators.required]})
    });
  }  


  hasError: any = (controlName: string, errorName: string) => {

		return !this.ionicForm.controls[controlName].valid &&

			this.ionicForm.controls[controlName].hasError(errorName) &&

			this.ionicForm.controls[controlName].touched;

	}  

  editarLugar(id: any, lugar: any) {
    this.editando = true;
    this.lugar = lugar;
    this.estado = "Editar el lugar";
    this.ionicForm.get('nombre').setValue(lugar.nombre);
  }

  eliminarLugar(id: any) {
    /* eliminar lugar a traves de firestore
    this.lugarService.deleteLugar(id);
    */

    // eliminar lugar desde api
    this.lugarService.borrarLugarApi(id).subscribe((response: any)=>{
      if(response){
        this.estado = "Alta destino";
        this.editando = false;
        this.ionicForm.reset();
      }
    }, error=>{
      console.error(error);
    });
  }

  cancelarEdicion(){
    this.estado = "Alta destino";
    this.editando = false;
    this.ionicForm.reset();
    this.lugar = new Lugar();
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
    console.log("cancelar subscripcion")
  }

  getPosition(): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			navigator.geolocation.getCurrentPosition((resp: any) => {
				this.latitud = resp.coords.latitude;
				this.longitud = resp.coords.longitude;
			},
			(err: any) => {
				if ( err.code === 1 ) {
					alert('Favor de activar la geolocalización en tu navegador y recargar la pantalla.');
				}
				this.latitud = null;
				this.longitud = null;
			}, {timeout: 5000, enableHighAccuracy: true });
		});

	}

}
