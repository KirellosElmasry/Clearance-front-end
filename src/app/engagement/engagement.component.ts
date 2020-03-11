import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from '../utility/personalData';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {

  personData = new personData();

  public form: FormGroup;
  public contactList: FormArray;
  selectedFile1: File;
  selectedFile2: File;
  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];

  statusOptions = [
    { value: 'y', name: 'Yes', checked: false },
    { value: 'n', name: 'No', checked: true }
  ];

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.personData.engagedBefore = 'n';
    this.showSaveBtn[0] = false;
    this.showAddRowBtn[0] = true;
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
      PriestName: [null, Validators.compose([Validators.required])],
      anulAttach: [null, Validators.compose([Validators.required])],
      engAttach: [null, Validators.compose([Validators.required])]
    });
  }

  // add a contact form group
  addRow(i) {
    this.contactList.push(this.createContact());
    this.showAddRowBtn[i] = false;
  }

  // remove contact from group
  // removeRow(index) {
  //   // this.contactList = this.form.get('contacts') as FormArray;
  //   this.contactList.removeAt(index);
  // }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  save(i) {
    console.log(this.getContactsFormGroup(i).controls['engageDate'].value);
    console.log(this.getContactsFormGroup(i).controls['engagePlace'].value);
    console.log(this.getContactsFormGroup(i).controls['PriestName'].value);

    console.log(this.getContactsFormGroup(i).controls['engAttach'].value);
    console.log(this.getContactsFormGroup(i).controls['anulAttach'].value);

    const formData = new FormData();

    formData.append('engagmentDate', this.getContactsFormGroup(i).controls['engageDate'].value);
    formData.append('engagmentPlace', this.getContactsFormGroup(i).controls['engagePlace'].value);

    formData.append('priestFather', this.getContactsFormGroup(i).controls['PriestName'].value);
    formData.append('status', "disengagement");
    formData.append('userId', sessionStorage.getItem("userId"));

    formData.append('engAttach', this.getContactsFormGroup(i).controls['engAttach'].value);
    formData.append('anulAttach', this.getContactsFormGroup(i).controls['anulAttach'].value);
    formData.append('refNo', this.personData.referenceNumber);

    this.userService.addPreviousEngagment(formData)
      .subscribe(
        data => {
          if (data.code == "200") {
            alert(" success ");
            this.showSaveBtn[i] = true;
            this.showAddRowBtn[i] = true;
          } else {
            alert("Error Happened " + data.message);
          }
        }, (err) => {
          console.log("error " + err.message);
          alert(" Error " + err.message);
        });
  }

  onFileChanged1(event) {
    this.selectedFile1 = event.target.files[0];

    if (this.selectedFile1) {
      console.log("File name : " + this.selectedFile1.name);
    }
  }

  onFileChanged2(event) {
    this.selectedFile2 = event.target.files[0];

    if (this.selectedFile2) {
      console.log("File name : " + this.selectedFile2.name);
    }
  }

  radioChange(event) {
    //call update engagement api
    let jsonObj = new dto();

    jsonObj.userId = sessionStorage.getItem("userId");
    jsonObj.refNo = this.personData.referenceNumber;
    jsonObj.isPreviousEngagement = event.value;

    this.userService.updateEngagmentClearance(jsonObj)
      .subscribe(
        data => {
          if (data.code == "200") {
            // alert(" success " );   

          } else {
            alert("Error Happened " + data.message);
          }
        }, (err) => {
          console.log("error " + err.message);
        });
  }

  submit() {

    this.router.navigate(['marriage'], { state: { data: this.personData } });

  }

  back() {
    this.router.navigate(['changeablePersonalData'], { state: { data: this.personData } });
  }

}
