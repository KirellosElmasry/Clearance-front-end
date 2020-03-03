import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changeable-personal-data',
  templateUrl: './changeable-personal-data.component.html',
  styleUrls: ['./changeable-personal-data.component.css']
})
export class ChangeablePersonalDataComponent implements OnInit {

  personData = new personData();
  constructor(private router:Router) { }

  ngOnInit() {
    this.personData = history.state.data;
    console.log("eid " + this.personData.emirateId);
  }

  next(){

    this.router.navigate(['engagement']);

  }

  back(){
    this.router.navigate(['fixedPersonalData']);
  }
}
