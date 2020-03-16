import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from '../utility/personalData';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.css']
})
export class ChildrensComponent implements OnInit {


  personData = new personData();

  public form: FormGroup;
  public contactList: FormArray;

  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];

  statusOptions = [
    { value: 'y', name: 'Yes', checked: false },
    { value: 'n', name: 'No', checked: true }
  ];

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.personData.hasChildren = 'n';
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
      childAge: [null, Validators.compose([Validators.required])],
      childName: [null, Validators.compose([Validators.required])],
      paptism: [null, Validators.compose([Validators.required])]
     
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
    console.log(this.getContactsFormGroup(i).controls['childName'].value);
    console.log(this.getContactsFormGroup(i).controls['childAge'].value);
    console.log(this.getContactsFormGroup(i).controls['paptism'].value);

    const json = new dto();

    json.refNo = this.personData.referenceNumber;
    json.userId = sessionStorage.getItem("userId");
    json.childName = this.getContactsFormGroup(i).controls['childName'].value;
    json.childAge = this.getContactsFormGroup(i).controls['childAge'].value;
    json.baptism = this.getContactsFormGroup(i).controls['paptism'].value;

    this.userService.addPreviousChild(json)
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

  radioChange(event) {
    //call update engagement api
    let jsonObj = new dto();

    jsonObj.userId = sessionStorage.getItem("userId");
    jsonObj.refNo = this.personData.referenceNumber;
    jsonObj.isPreviousChild = event.value;

    this.userService.updateChildClearance(jsonObj)
      .subscribe(
        data => {
          if (data.code == "200") {
            console.log("status " + data.status);

          } else {
            alert("Error Happened " + data.message);
          }
        }, (err) => {
          console.log("error " + err.message);
        });
  }

  submit(){
    this.router.navigate(['socialStatus']);

  }

  back(){
    this.router.navigate(['marriage']);
  }
}
