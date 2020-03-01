import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {


  constructor(private router: Router, private fb: FormBuilder) { }

   engageForm =  new FormGroup({
    engageDataArr: new FormControl('')
 
  });

  ngOnInit() {
   
  }
 
  get engageArr() {
    return this.engageForm.get('engageDataArr') as FormArray;
  }

  addNewRow() {
    this.engageArr.push(new FormControl(''));
  }

  next() {
    this.router.navigate(['marriage']);
  }

  back() {
    this.router.navigate(['changeablePersonalData']);
  }
}
