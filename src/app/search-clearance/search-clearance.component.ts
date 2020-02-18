import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-clearance',
  templateUrl: './search-clearance.component.html',
  styleUrls: ['./search-clearance.component.css']
})
export class SearchClearanceComponent implements OnInit {

  eId :string;
  constructor() { }

  ngOnInit() {
  }

  searchPerson(){
    console.log(this.eId);
  }
}
