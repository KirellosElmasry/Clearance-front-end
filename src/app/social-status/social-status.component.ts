import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';
import { Router } from '@angular/router';

export interface Status {
  viewValueEN: string;
  viewValueAR: string;
}

@Component({
  selector: 'app-social-status',
  templateUrl: './social-status.component.html',
  styleUrls: ['./social-status.component.css']
})
export class SocialStatusComponent implements OnInit {

  socialStatus: Status[] = [
    { viewValueEN: 'Single', viewValueAR: 'أعزب' },
    { viewValueEN: 'Divorced', viewValueAR: 'مطلق' },
    { viewValueEN: 'Widower', viewValueAR: 'أرمل' }
  ];

  personData = new personData();

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.personData = history.state.data;
  }

  updateClearanceFinal(){
    //call updateClearanceFinal

    let jsonObj = new dto();

    jsonObj.userId = sessionStorage.getItem("userId");
    jsonObj.refNo = this.personData.referenceNumber;
    jsonObj.socialStatus = this.personData.socialStatus;
    jsonObj.sourceOfPermitMarriage = this.personData.sourceOfPermitMarriage;
    jsonObj.dateOfPermitMarriage = this.personData.dateOfPermitMarriage.getDate().toString();

    this.userService.updateClearanceFinal(jsonObj)
      .subscribe(
        data => {
          if (data.code == "200") {
            // alert(" success " );   

          } else {
            alert("Error Happened " + data.message);
          }
        }, (err) => {
          console.log("error " + err.message);
        });
  }

  
  back(){
    this.router.navigate(['childrens'], { state: { data: this.personData } });
  }
}
