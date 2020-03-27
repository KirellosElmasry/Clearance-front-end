import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';
import { Church } from '../utility/church';
import { UserService } from '../services/user.service';

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

    this.personData = history.state.data;
    console.log("placeOfBaptism " + this.personData.placeOfBaptism);
      // for testing
  // this.personData = new personData();
  // this.personData.emirateId = "555";
  }

  next(){

    this.router.navigate(['engagement'], { state: { data: this.personData } });

  }

  back(){
    this.router.navigate(['fixedPersonalData'], { state: { data: this.personData } });
  }
}
