import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from "@angular/forms";
import { personData } from '../utility/personalData';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {

  personData = new personData();
  
  constructor(private router: Router, private fb: FormBuilder) { }

  engagementForm = this.fb.group({

    engageDataArr: this.fb.array([
      this.fb.control('')
    ])
  });

  ngOnInit() {
    //this.personData = history.state.data;
   // console.log("fatherOfConfession " + this.personData.fatherOfConfession);
  }
 
  get engageDataArr() {
    return this.engagementForm.get('engageDataArr') as FormArray;
  }

  addNewRow() {
    this.engageDataArr.push(this.fb.control(''));
  }

  next() {
    console.warn(this.engagementForm.value);
    //this.router.navigate(['marriage']);
  }

  back() {
    this.router.navigate(['changeablePersonalData']);
  }
}
