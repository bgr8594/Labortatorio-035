  
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authSvc: AuthService, private afAuth: AngularFireAuth,
    private router: Router) {}

  onLogout(){
    this.afAuth.auth.signOut();
    console.log("Logout!");
    this.router.navigateByUrl('/login');
  }
}