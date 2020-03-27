import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { user } from '../utility/user';
import { loginResult } from '../utility/loginResult';

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
  loginUser = new user();
  result = new loginResult();

  constructor(private router:Router,public loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin(){
    console.log(this.userName + " "+this.password);
    //call login service then redirect to home page
    
    this.loginService.doLogin(this.loginUser)
    .subscribe(
      data=>
      {
        this.showSpinner = false;
        this.result = data;  
     
        if(this.result.code == "200"){
          
          sessionStorage.setItem('userId', this.result.userId);

          // { path: 'login', component: LoginComponent },
          // { path: 'homePage', component: HomePageComponent },
          // { path: 'fixedPersonalData', component: FixedPersonalDataComponent },
          // { path: 'changeablePersonalData', component: ChangeablePersonalDataComponent },
          // { path: 'marriage', component: MarriageComponent },
          // { path: 'childrens', component: ChildrensComponent },
          // { path: 'engagement', component: EngagementComponent },
          // { path: 'test', component: TestComponent },
          // { path: 'searchClearance', component:
          //{ path: 'socialStatus', component: SocialStatusComponent }
          
          //this.router.navigate(['homePage']);
          this.router.navigate(['engagement']);

        }else{
          alert("wrong username or password!");
        }
      } , (err) => {
        console.log("error "+err.message);
        alert(" Error in login process: "+err.message);
      }); 
  }

}
