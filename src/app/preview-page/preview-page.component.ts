import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clearanceData } from '../utility/clearanceData';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.css']
})
export class PreviewPageComponent implements OnInit {

  clearances : clearanceData;
  clearancefromPrev:any;
  
  constructor( private router: Router) {
   }

  ngOnInit() {
    debugger;
    this.clearances = history.state.data;
  }

  back() {
    this.router.navigate(['socialStatus'], { state: { data: this.clearances } });
  }

  print(){
    console.log("print clearance");
    window.print();
  }
}
