import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from "../utility/personalData";
import { UserService } from "../services/user.service";
import { dto } from "../utility/dto";

@Component({
  selector: "app-marriage",
  templateUrl: "./marriage.component.html",
  styleUrls: ["./marriage.component.css"]
})
export class MarriageComponent implements OnInit {
  personData: personData;

  public form: FormGroup;
  public marriageFormArray: FormArray;

  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];
  activateNextBtn = false;

  statusOptions = [
    { value: "y", name: "Yes", checked: false },
    { value: "n", name: "No", checked: true }
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

    if (history.state.data) {
      this.personData = history.state.data;
    }
    // for testing
    else {
      console.log(this.personData);
      if (!this.personData) {
        this.personData = new personData();
        this.personData.emirateId = "555";
      }
    }

    if (!this.personData.marriedBefore) {
      this.personData.marriedBefore = "n";
    }
    this.showSaveBtn[0] = false;
    this.showAddRowBtn[0] = true;

    // set marriageFormArray to this field
    this.marriageFormArray = this.form.get("contacts") as FormArray;

    // in back case, fill engagement form with entered data before
    this.fillFormAfterBackBtn();
  }

  fillFormAfterBackBtn() {
    if (history.state.data && this.personData.marriageData.length > 0) {
      for (let i = 0; i < this.personData.marriageData.length; i++) {
        const marriageObj = this.personData.marriageData[i];

        this.addRow(i);
        this.getContactsFormGroup(i).controls["marriageDate"].setValue(
          marriageObj.marriageDate
        );
        this.getContactsFormGroup(i).controls["marriagePlace"].setValue(
          marriageObj.marriagePlace
        );
        this.getContactsFormGroup(i).controls["priestFather"].setValue(
          marriageObj.priestName
        );
        this.getContactsFormGroup(i).controls["status"].setValue(
          marriageObj.status
        );
        this.getContactsFormGroup(i).controls["kindOfMarriage"].setValue(
          marriageObj.kindOfMarriage
        );
      }
      this.personData.marriageData = [];
    }
  }
  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get("contacts") as FormArray;
  }

  // contact formgroup
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

  // remove contact from group
  // removeRow(index) {
  //   // this.marriageFormArray = this.form.get('contacts') as FormArray;
  //   this.marriageFormArray.removeAt(index);
  // }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    const formGroup = this.marriageFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  save(i) {
    const json = new dto();

    json.marriageDate = this.getContactsFormGroup(i).controls[
      "marriageDate"
    ].value;
    json.marriagePlace = this.getContactsFormGroup(i).controls[
      "marriagePlace"
    ].value;

    json.priestFather = this.getContactsFormGroup(i).controls[
      "priestFather"
    ].value;
    json.status = this.getContactsFormGroup(i).controls["status"].value;
    json.userId = sessionStorage.getItem("userId");

    json.kindOfMarriage = this.getContactsFormGroup(i).controls[
      "kindOfMarriage"
    ].value;
    json.refNo = this.personData.referenceNumber;

    this.userService.addPreviousMarrage(json).subscribe(
      data => {
        if (data.code == "200") {
          // alert(" success ");
          this.marriageFormArray.push(this.createMarriageFormGroup());

          this.showSaveBtn[i] = true;
          this.showAddRowBtn[i] = true;
          this.activateNextBtn = true;
        } else {
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
    let jsonObj = new dto();

    jsonObj.userId = sessionStorage.getItem("userId");
    jsonObj.refNo = this.personData.referenceNumber;
    jsonObj.isPreviousMarrage = event.value;

    this.userService.updateMarrageClearance(jsonObj).subscribe(
      data => {
        if (data.code == "200") {
          // alert(" success " );
        } else {
          alert("Error Happened " + data.message);
        }
      },
      err => {
        console.log("error " + err.message);
      }
    );
  }

  submit() {
    this.router.navigate(["childrens"], { state: { data: this.personData } });
  }

  back() {
    this.router.navigate(["engagement"], { state: { data: this.personData } });
  }
}
