import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  constructor(
    private autSvc: AuthService,
    private router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async onRegister(){
    this.presentLoadingWithOptions();
    this.autSvc.onRegister(this.user).then((user: any)=>{
      if(user!=undefined && user.code == undefined){
        console.log("Successfully created user!");
        this.router.navigate(['/']);
      }
        this.loadingController.dismiss();
    }).catch(error=>{
        this.loadingController.dismiss();
      console.log(error);
    });;

  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 800,
      message: 'Iniciando sesion...',
      translucent: true,
      //cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }  
}