import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.class';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  constructor(private autSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.autSvc.onRegister(this.user);
    if(user!=undefined && user.code == undefined){
      console.log("Succesfully create user!");
      this.router.navigate(['/']);
    }
  }
}
