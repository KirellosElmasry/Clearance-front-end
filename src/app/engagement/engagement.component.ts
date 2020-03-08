import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from '../utility/personalData';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {

  personData = new personData();

  public form: FormGroup;
  public contactList: FormArray;

  statusOptions = [
    { value: 'y', name: 'Yes', checked: false},
    { value: 'n', name: 'No', checked: true}
  ];
  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.personData.engagedBefore = 'n';
   }

  ngOnInit() {
  
    this.form = this.fb.group({
      contacts: this.fb.array([this.createContact()])
    });

    //this.personData = history.state.data;
    // console.log("fatherOfConfession " + this.personData.fatherOfConfession);

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;
  }

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
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
    console.log(this.getContactsFormGroup(0).controls['engageDate'].value);
    console.log(this.getContactsFormGroup(0).controls['engagePlace'].value);
    console.log(this.getContactsFormGroup(0).controls['PriestName'].value);

    const formData = new FormData();
   // formData.append('file', this.selectedFile);
    // formData.append('engagmentDate', this.getContactsFormGroup(0).controls['engageDate'].value);
    // formData.append('engagmentPlace', this.personData.birthDate.toLocaleDateString());
    
    // formData.append('priestFather', this.personData.placeOfBirth);
    // formData.append('status', this.personData.placeOfBaptism);
    // formData.append('userId', this.personData.baptismDate.toLocaleDateString());
    
    // formData.append('engAttach', this.personData.edQualification);
    // formData.append('anulAttach', this.personData.graduateDate.toLocaleDateString());
    // formData.append('refNo', this.personData.graduateDate.toLocaleDateString());

    // this.userService.addPreviousEngagment(formData)
    //   .subscribe(
    //     data => {
    //       if (data.code == "200") {
    //         this.router.navigate(['marriage']);
    //       } else {
    //         alert("Error Happened " + data.message);
    //       }
    //     }, (err) => {
    //       console.log("error " + err.message);
    //       alert(" Error " + err.message);
    //     });
    this.router.navigate(['marriage'], { state: { data: this.personData } });
  
  }

  back() {
    this.router.navigate(['changeablePersonalData'], { state: { data: this.personData } });
  }
}
