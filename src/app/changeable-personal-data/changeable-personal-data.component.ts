import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';
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

  constructor(private router:Router) { }

  ngOnInit() {
   // this.personData = history.state.data;
    //console.log("eid " + this.personData.emirateId);
  }

  next(){

    this.router.navigate(['engagement']);

  }

  back(){
    this.router.navigate(['fixedPersonalData']);
  }
}
