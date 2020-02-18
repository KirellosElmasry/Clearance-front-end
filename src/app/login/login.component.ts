import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  role: string;
  showSpinner : boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onLogin(){
    console.log(this.userName + " "+this.password);
    //call login service then redirect to home page

    this.router.navigate(['homePage']);

    
  }

}
