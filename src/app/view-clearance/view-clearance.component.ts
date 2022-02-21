import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clearanceData } from '../utility/clearanceData';


@Component({
  selector: 'app-view-clearance',
  templateUrl: './view-clearance.component.html',
  styleUrls: ['./view-clearance.component.css']
})
export class ViewClearanceComponent implements OnInit {
  clearanceData: clearanceData;

  constructor(private router: Router,) { }

  ngOnInit() {
    this.clearanceData = history.state.data[0];
    console.log(this.clearanceData);
  }

  back(){
    this.router.navigate(['searchClearance']);
  }
}
