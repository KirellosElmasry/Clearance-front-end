import { Children } from './../utility/children';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from '../utility/personalData';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';
import { clearanceData } from '../utility/clearanceData';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.css']
})
export class ChildrensComponent implements OnInit {
  personData : personData;
  clearances : clearanceData;

  public form: FormGroup;
  public childFormArray: FormArray;

  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];
  activateNextBtn = false;

  statusOptions = [
    { value: 'Y', name: 'Yes', checked: false },
    { value: 'N', name: 'No', checked: true }
  ];

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {

  }

  ngOnInit() {

    this.form = this.fb.group({
      contacts: this.fb.array([])
    });

    if (history.state.data) {
      this.clearances = history.state.data;
      this.personData = this.clearances.personalData;
    }

    this.personData.childrenData = [];
     
    // for testing
    // else {
    //   console.log(this.personData);
    //   if (!this.personData) {
    //     this.personData = new personData();
    //     this.personData.emirateId = "555";
    //   }
    // }
    
    if (!this.clearances.isHaveChildern) {
      this.personData.hasChildren = 'N';
    }
    else{
      this.personData.hasChildren = this.clearances.isHaveChildern;
    }

    this.showSaveBtn[0] = false;
    this.showAddRowBtn[0] = true;
    // set childFormArray to this field
    this.childFormArray = this.form.get('contacts') as FormArray;
  
      // in back case, fill child form with entered data before
      this.fillFormAfterBackBtn();
  }

  fillFormAfterBackBtn() {
    if (this.personData.childrenData && this.personData.childrenData.length > 0) {
      for (let i = 0; i < this.personData.childrenData.length; i++) {
        const childObj = this.personData.childrenData[i];

        this.addRow(i);
        this.getContactsFormGroup(i).controls["childName"].setValue(
          childObj.childName
        );
        this.getContactsFormGroup(i).controls["childAge"].setValue(
          childObj.childAge
        );
        this.getContactsFormGroup(i).controls["baptism"].setValue(
          childObj.baptism
        );

      }
      this.personData.childrenData = [];
    }
  }

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  // createChildFormGroup
  createChildFormGroup(): FormGroup {
    return this.fb.group({
      childAge: [null, Validators.compose([Validators.required])],
      childName: [null, Validators.compose([Validators.required])],
      baptism: [null, Validators.compose([Validators.required])]
     
    });
  }

  // add a contact form group
  addRow(i) {
    this.childFormArray.push(this.createChildFormGroup());
    this.showAddRowBtn[i] = false;
  }

  // remove contact from group
  // removeRow(index) {
  //   // this.childFormArray = this.form.get('contacts') as FormArray;
  //   this.childFormArray.removeAt(index);
  // }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    const formGroup = this.childFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  save(i) {
    const childObj = new Children();

    childObj.refNo = this.clearances.refNo;
    childObj.userId = sessionStorage.getItem("userId");
    childObj.childName = this.getContactsFormGroup(i).controls['childName'].value;
    childObj.childAge = this.getContactsFormGroup(i).controls['childAge'].value;
    childObj.baptism = this.getContactsFormGroup(i).controls['baptism'].value;

    this.userService.addPreviousChild(childObj)
      .subscribe(
        data => {
          if (data.code == "200") {
            console.log("save success");
            this.personData.childrenData.push(childObj);
            this.showSaveBtn[i] = true;
            this.showAddRowBtn[i] = true;
            this.activateNextBtn = true;
            
          } else {
            console.log(data);
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

    jsonObj.userId = Number(sessionStorage.getItem("userId"));
    jsonObj.refNo = this.clearances.refNo;
    jsonObj.isPreviousChild = event.value;

    this.userService.updateChildClearance(jsonObj)
      .subscribe(
        data => {
          if (data.code == "200") {
            console.log("status " + data.status);
            if (event.value === "Y" && this.childFormArray.length === 0) {
              this.childFormArray.push(this.createChildFormGroup());
            }

          } else {
            console.log(data);
            alert("Error Happened " + data.message);
          }
        }, (err) => {
          console.log("error " + err.message);
        });
  }

  submit(){
    
    this.router.navigate(['socialStatus'], { state: { data: this.clearances } });

  }

  back(){    
    this.router.navigate(['marriage'], { state: { data: this.clearances } });
  }
}
