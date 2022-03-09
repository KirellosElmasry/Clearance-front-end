import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { personData } from "../utility/personalData";
import { UserService } from "../services/user.service";
import { dto } from "../utility/dto";
import { Engagement } from "../utility/engagement";
import { clearanceData } from "../utility/clearanceData";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-engagement",
  templateUrl: "./engagement.component.html",
  styleUrls: ["./engagement.component.css"]
})
export class EngagementComponent implements OnInit {
  personData: personData;
  clearances : clearanceData;

  public form: FormGroup;
  public engageFormArray: FormArray;
  selectedFile1: File;
  selectedFile2: File;
  showSaveBtn: boolean[] = [];
  showAddRowBtn: boolean[] = [];
  activateNextBtn = false;

  statusOptions = [
    { value: "y", name: "Yes", checked: false },
    { value: "n", name: "No", checked: true }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      contacts: this.fb.array([])
    });

    if (history.state.data) {
      this.clearances = history.state.data;
      this.personData = this.clearances.personalData;
      this.personData.engagementData = [];
    }
    // for testing
    //   else{
    //   console.log(this.personData);
    //   if(!this.personData){
    //     this.personData = new personData();
    //     this.personData.emirateId = "555";
    //   }
    // }

    if (!this.clearances.isPreviousEngagement) {
      this.personData.engagedBefore = "n";
    }
    this.showSaveBtn[0] = false;
    this.showAddRowBtn[0] = true;

    // set engageFormArray to this field
    this.engageFormArray = this.form.get("contacts") as FormArray;

    this.fillFormAfterBackBtn();
  }

  fillFormAfterBackBtn() {
    debugger;
    // in back case, fill engagement form with entered data before
    if ( this.personData.engagementData && this.personData.engagementData.length > 0) {
      for (let i = 0; i < this.personData.engagementData.length; i++) {
        const engageObj = this.personData.engagementData[i];
        this.addRow(i);
        this.getContactsFormGroup(i).controls["engageDate"].setValue(
          engageObj.engageDate
        );
        this.getContactsFormGroup(i).controls["engagePlace"].setValue(
          engageObj.engagePlace
        );
        this.getContactsFormGroup(i).controls["PriestName"].setValue(
          engageObj.priestName
        );
        //this.getContactsFormGroup(i).controls['engAttach'].setValue(engageObj.engAttach);
        //this.getContactsFormGroup(i).controls['anulAttach'].setValue(engageObj.anulAttach);
      }
      this.personData.engagementData = [];
    }
  }

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get("contacts") as FormArray;
  }

  // contact formgroup
  createEngageFormGroup(): FormGroup {
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
    this.engageFormArray.push(this.createEngageFormGroup());
    this.showAddRowBtn[i] = false;
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    const formGroup = this.engageFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  save(i) {
    debugger;
    const engagementObj = new Engagement();
    engagementObj.engageDate = this.getContactsFormGroup(i).controls[
      "engageDate"
    ].value;
    engagementObj.engagePlace = this.getContactsFormGroup(i).controls[
      "engagePlace"
    ].value;
    engagementObj.priestName = this.getContactsFormGroup(i).controls[
      "PriestName"
    ].value;

    engagementObj.engAttach = this.selectedFile1;
    engagementObj.anulAttach = this.selectedFile2;

  //  this.http.get(engpath).subscribe(data => engagementObj.engAttach =  data);
    
    const formData = new FormData();

    formData.append("engagmentDate", engagementObj.engageDate.toLocaleString());
    formData.append("engagmentPlace", engagementObj.engagePlace);

    formData.append("priestFather", engagementObj.priestName);
    formData.append("status", "disengagement");
    formData.append("userId", sessionStorage.getItem("userId"));

    formData.append("engAttach",  this.selectedFile1);
    formData.append("anulAttach",  this.selectedFile2);
    formData.append("refNo", this.clearances.refNo);

    this.userService.addPreviousEngagment(formData).subscribe(
      data => {
        if (data.code == "200") {
          console.log(" success ");

          //add engageData to personData
          console.log(this.personData.engagedBefore);
          this.personData.engagementData.push(engagementObj);

          this.showSaveBtn[i] = true;
          this.showAddRowBtn[i] = true;
          this.activateNextBtn = true;
        } else {
          alert("Error Happened " + data.result.res.toString());
        }
      },
      err => {
        console.log("error " + err.error.message);
        alert(" Error " + err.message);
      }
    );
  }

  onFileChanged1(event) {
    this.selectedFile1 = event.target.files[0];

    if (this.selectedFile1) {
      console.log("File name 1: " + this.selectedFile1.name);
    }
  }

  onFileChanged2(event) {
    this.selectedFile2 = event.target.files[0];

    if (this.selectedFile2) {
      console.log("File name 2: " + this.selectedFile2.name);
    }
  }

  radioChange(event) {
    debugger;
    //call update engagement api
    let jsonObj = new dto();

    jsonObj.userId = Number(sessionStorage.getItem("userId"));
    jsonObj.refNo = this.clearances.refNo;
    jsonObj.isPreviousEngagement = event.value;

    this.userService.updateEngagmentClearance(jsonObj).subscribe(
      data => {
        if (data.code == "200") {
          // alert(" success " );
          if (event.value === "y" && this.engageFormArray.length === 0) {
            this.engageFormArray.push(this.createEngageFormGroup());
          }
        } else {
          alert("Error Happened " + data.result.res);
        }
      },
      err => {
        console.log("error " + err.message);
      }
    );
  }

  submit() {
    this.router.navigate(["marriage"], { state: { data: this.personData } });
  }

  back() {
    this.router.navigate(["changeablePersonalData"], {
      state: { data: this.personData }
    });
  }
}
