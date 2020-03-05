import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from '../utility/personalData';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {

  personData = new personData();
  
   public form: FormGroup;
   public contactList: FormArray;

   // returns all form groups under contacts
   get contactFormGroup() {
      return this.form.get('contacts') as FormArray;
   }

   constructor(private router: Router, private fb: FormBuilder) { }

   ngOnInit() {
      this.form = this.fb.group({
         contacts: this.fb.array([this.createContact()])
      });

//this.personData = history.state.data;
     // console.log("fatherOfConfession " + this.personData.fatherOfConfession);

      // set contactlist to this field
      this.contactList = this.form.get('contacts') as FormArray;
   }

   // contact formgroup
   createContact(): FormGroup {
      return this.fb.group({
         engageDate: [null, Validators.compose([Validators.required])], 
         engagePlace: [null, Validators.compose([Validators.required])], 
         PriestName: [null, Validators.compose([Validators.required])]
      });
   }

   // add a contact form group
   addRow() {
      this.contactList.push(this.createContact());
   }

   // remove contact from group
   removeRow(index) {
      // this.contactList = this.form.get('contacts') as FormArray;
      this.contactList.removeAt(index);
   }

   // get the formgroup under contacts form array
   getContactsFormGroup(index): FormGroup {
      // this.contactList = this.form.get('contacts') as FormArray;
      const formGroup = this.contactList.controls[index] as FormGroup;
      return formGroup;
   }

   // method triggered when form is submitted
   submit() {
      console.log(this.form.value);
   }

   back() {
      this.router.navigate(['changeablePersonalData']);
    }
}
