import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.css']
})
export class ChildrensComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  finish(){
    this.router.navigate(['homePage']);

  }

  back(){
    this.router.navigate(['marriage']);
  }
}
