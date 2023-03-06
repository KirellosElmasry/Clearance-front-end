import { Marriage } from './../utility/marriage';
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from "../utility/personalData";
import { UserService } from "../services/user.service";
import { dto } from "../utility/dto";
import { clearanceData } from '../utility/clearanceData';

@Component({
  selector: "app-marriage",
  templateUrl: "./marriage.component.html",
  styleUrls: ["./marriage.component.css"]
})
export class MarriageComponent implements OnInit {
  @Input() clearancefromPrev: clearanceData;

  clearances : clearanceData;

  public form: FormGroup;
  public marriageFormArray: FormArray;

  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];
  activateNextBtn = false;

  statusOptions = [
    { value: "Y", name: "Yes", checked: false },
    { value: "N", name: "No", checked: true }
  ];

  mariageStatus = [
    { value: "widower", name: "Widower" },
    { value: "divorced", name: "Divorced" }
  ];
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      contacts: this.fb.array([])
    });

    debugger;
    if (history.state.data) {
      this.clearances = history.state.data;

      if(!this.clearances.personalData.marriageData)
          this.clearances.personalData.marriageData = [];
    }
    else
      this.clearances = this.clearancefromPrev;
    
    if (!this.clearances.isPreviousMarriage) {
      this.clearances.isPreviousMarriage = "N";
    }
 
    this.showSaveBtn[0] = false;
    this.showAddRowBtn[0] = true;

    // set marriageFormArray to this field
    this.marriageFormArray = this.form.get("contacts") as FormArray;

    // in back case, fill marriage form with entered data before
    this.fillFormAfterBackBtn();
  }

  fillFormAfterBackBtn() {
    debugger;
    if ( this.clearances.personalData.marriageData && this.clearances.personalData.marriageData.length > 0) {
      for (let i = 0; i < this.clearances.personalData.marriageData.length; i++) {
        const marriageObj = this.clearances.personalData.marriageData[i];

        this.addRow(i);
        this.getContactsFormGroup(i).controls["marriageDate"].setValue(
          marriageObj.marriageDate
        );
        this.getContactsFormGroup(i).controls["marriagePlace"].setValue(
          marriageObj.marriagePlace
        );
        this.getContactsFormGroup(i).controls["priestFather"].setValue(
          marriageObj.priestFather
        );
        this.getContactsFormGroup(i).controls["status"].setValue(
          marriageObj.status
        );
        this.getContactsFormGroup(i).controls["kindOfMarriage"].setValue(
          marriageObj.kindOfMarriage
        );
      }
      this.clearances.personalData.marriageData = [];
    }
  }

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get("contacts") as FormArray;
  }

  // createMarriageFormGroup
  createMarriageFormGroup(): FormGroup {
    return this.fb.group({
      marriageDate: [null, Validators.compose([Validators.required])],
      marriagePlace: [null, Validators.compose([Validators.required])],
      priestFather: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      kindOfMarriage: [null, Validators.compose([Validators.required])]
    });
  }

  // add a contact form group
  addRow(i) {
    this.marriageFormArray.push(this.createMarriageFormGroup());
    this.showAddRowBtn[i] = false;
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    const formGroup = this.marriageFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  save(i) {
    const marriageObj = new Marriage();

    marriageObj.marriageDate = this.getContactsFormGroup(i).controls[
      "marriageDate"
    ].value;
    marriageObj.marriagePlace = this.getContactsFormGroup(i).controls[
      "marriagePlace"
    ].value;

    marriageObj.priestFather = this.getContactsFormGroup(i).controls[
      "priestFather"
    ].value;
    marriageObj.status = this.getContactsFormGroup(i).controls["status"].value;
    marriageObj.userId = sessionStorage.getItem("userId");

    marriageObj.kindOfMarriage = this.getContactsFormGroup(i).controls[
      "kindOfMarriage"
    ].value;
    marriageObj.refNo = this.clearances.refNo;

    this.userService.addPreviousMarrage(marriageObj).subscribe(
      data => {
        if (data.code == "200") {
          // alert(" success ");
          if(!this.clearances.personalData.marriageData)
            this.clearances.personalData.marriageData =[];

          this.clearances.personalData.marriageData.push(marriageObj);
          console.log("saved successfully.")
          this.showSaveBtn[i] = true;
          this.showAddRowBtn[i] = true;
          this.activateNextBtn = true;
        } else {
          console.log(data);
          alert("Error Happened " + data.message);
        }
      },
      err => {
        console.log("error " + err.message);
        alert(" Error " + err.message);
      }
    );
  }

  radioChange(event) {
    //call update mariage api
    debugger;
    let jsonObj = new dto();

    jsonObj.userId = Number(sessionStorage.getItem("userId"));
    jsonObj.refNo = this.clearances.refNo;
    jsonObj.isPreviousMarrage = event.value;

    this.userService.updateMarrageClearance(jsonObj).subscribe(
      data => {
        debugger;
        if (data.code == "200") {
          // alert(" success " );
          if (event.value === "Y" && this.marriageFormArray.length === 0) {
            this.marriageFormArray.push(this.createMarriageFormGroup());
          }
          this.clearances.isPreviousMarriage =  event.value;      
        } else {
          console.log(data);
          alert("Error Happened " + data.message);
        }
      },
      err => {
        console.log("error " + err.message);
      }
    );
  }

  submit() {
    if(this.clearances.isPreviousMarriage == 'Y')
      this.router.navigate(["childrens"], { state: { data: this.clearances } });
    else
      this.router.navigate(['socialStatus'], { state: { data: this.clearances } });
  }

  back() {
    this.router.navigate(["engagement"], { state: { data: this.clearances } });
  }
}
