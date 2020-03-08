import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { personData } from '../utility/personalData';

@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css']
})
export class MarriageComponent implements OnInit {

  personData = new personData();
  
  constructor(private router:Router) { }

  ngOnInit() {
    this.personData = history.state.data;
    console.log("engaged before "+ this.personData.engagedBefore)
  }

  next(){
    this.router.navigate(['childrens'], { state: { data: this.personData } });
  }

  back(){
    this.router.navigate(['engagement'], { state: { data: this.personData } });
  }
}
