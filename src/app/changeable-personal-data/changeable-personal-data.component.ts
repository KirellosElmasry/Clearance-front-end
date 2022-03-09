import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';
import { Church } from '../utility/church';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';
import { clearanceData } from '../utility/clearanceData';

export interface Status {
  value: string;
  viewValueEN: string;
  viewValueAR: string;
}

@Component({
  selector: 'app-changeable-personal-data',
  templateUrl: './changeable-personal-data.component.html',
  styleUrls: ['./changeable-personal-data.component.css']
})
export class ChangeablePersonalDataComponent implements OnInit {

  personData = new personData();
  clearances : clearanceData;

  genders: Status[] = [
    { value: 'male', viewValueEN: 'Male', viewValueAR: 'ذكر' },
    { value: 'female', viewValueEN: 'Female', viewValueAR: 'انثي' }
  ];
  
  confessionRate: Status[] = [
    { value: 'rarely', viewValueEN: 'Rarely', viewValueAR: 'نادرا' },
    { value: 'average', viewValueEN: 'Average', viewValueAR: 'متوسط' },
    { value: 'continues', viewValueEN: 'Continues', viewValueAR: 'منتظم' }
  ];

  militaryStatus: Status[] = [
    { value: '0', viewValueEN: 'Finished', viewValueAR: 'اتم الخدمه' },
    { value: '1', viewValueEN: 'postponed', viewValueAR: 'تأجيل' },
    { value: '2', viewValueEN: 'Exemption', viewValueAR: 'اعفاء' },
    { value: '3', viewValueEN: 'Inappropriate', viewValueAR: 'غير لائق' }
  ];

  churchList: Church[];

  constructor(private router:Router, private userService: UserService) { 
    
  }

  ngOnInit() {
    this.userService.getAllChurch().subscribe(
      data => {
        if (data.code == "200") {
       this.churchList = data.allChurch;
          
        } else {
          alert("Error Happened " + data.message);
        }
      }, (err) => {
        console.log("error " + err.message);
        alert(" Error " + err.message);
      });

      this.clearances = history.state.data;
      this.personData = this.clearances.personalData;

    console.log("placeOfBaptism " + this.personData.baptismPlace);
      // for testing
  // this.personData = new personData();
  // this.personData.emirateId = "555";
  }

  next(){
    debugger;
    //call addNewClearance

    let jsonObj = new dto();

    jsonObj.emirateId = this.clearances.personalData.emirateId;
    jsonObj.address = this.clearances.address;
    jsonObj.job = this.clearances.job;
    jsonObj.jobAddress = this.clearances.jobAddress;
    jsonObj.militaryService = this.clearances.militaryService;
    jsonObj.fromChurch = this.clearances.fromChurch;
    jsonObj.recognitionRegularityRate = this.clearances.recognitionRegularityRate;
    jsonObj.intakeRate = this.clearances.intakeRate;
    jsonObj.fatherOfConfession = this.clearances.fatherOfConfession;
    jsonObj.gender = this.clearances.gender;
    jsonObj.churchId = this.clearances.church.churchId.toString();
    jsonObj.userId = Number(sessionStorage.getItem("userId"));
    debugger;
    this.userService.addNewClearance(jsonObj).subscribe(
      data => {
        if (data.code == "200") {
          console.log(" success " );
          this.router.navigate(['engagement'], { state: { data: this.clearances } });
          
        } else {
          alert(data.result.res);
        }
      },
      err => {
        console.log("error " + err.msg);
      }
    );


  }

  back(){
    this.router.navigate(['fixedPersonalData'], { state: { data: this.personData } });
  }
}
