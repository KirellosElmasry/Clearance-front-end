import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css']
})
export class MarriageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  next(){
    this.router.navigate(['childrens']);

  }

  back(){
    this.router.navigate(['engagement']);
  }
}
