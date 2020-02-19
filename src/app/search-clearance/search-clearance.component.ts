import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-clearance',
  templateUrl: './search-clearance.component.html',
  styleUrls: ['./search-clearance.component.css']
})
export class SearchClearanceComponent implements OnInit {

  eId :string;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  searchPerson(){
    console.log(this.eId);
  }

  newClearance(){
    console.log("newClearance");
    this.router.navigate(['fixedPersonalData']);
  }
  viewClearance(){
    console.log("viewClearance");
  }
  createOtherClearance(){
    console.log("createOtherClearance");
    this.router.navigate(['fixedPersonalData']);
  }
}
