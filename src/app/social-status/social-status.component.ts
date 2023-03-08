import { Component, Input, OnInit } from "@angular/core";
import { personData } from "../utility/personalData";
import { UserService } from "../services/user.service";
import { dto } from "../utility/dto";
import { Router } from "@angular/router";
import { clearanceData } from "../utility/clearanceData";

export interface Status {
  viewValueEN: string;
  viewValueAR: string;
}

@Component({
  selector: "app-social-status",
  templateUrl: "./social-status.component.html",
  styleUrls: ["./social-status.component.css"]
})
export class SocialStatusComponent implements OnInit {
  
  @Input() clearancefromPrev: clearanceData;

  socialStatus: Status[] = [
    { viewValueEN: "Single", viewValueAR: "أعزب" },
    { viewValueEN: "Divorced", viewValueAR: "مطلق" },
    { viewValueEN: "Widower", viewValueAR: "أرمل" }
  ];

  personData: personData;
  clearances : clearanceData;

  showSpinner = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    debugger;
    if(history.state.data)
      this.clearances = history.state.data;
    else
      this.clearances = this.clearancefromPrev;

    this.personData = this.clearances.personalData;
  }

  updateClearanceFinal() {
    //call updateClearanceFinal

    let jsonObj = new dto();

    this.showSpinner = true;
    jsonObj.userId = Number(sessionStorage.getItem("userId"));
    jsonObj.refNo = this.clearances.refNo;
    jsonObj.socialStatus = this.personData.socialStatus;
    jsonObj.sourceOfPermitMarriage = this.personData.sourceOfPermitMarriage;
    jsonObj.dateOfPermitMarriage = this.personData.dateOfPermitMarriage
      .toString();

    this.userService.updateClearanceFinal(jsonObj).subscribe(
      data => {
        
        if (data.code == "200") {
          console.log(" success " );
          this.clearances.emirateId = this.clearances.personalData.emirateId;
        //  this.router.navigate(['previewPage'], { state: { data: this.clearances } });

        //call generate report
        console.log("generate report for RefNo " +this.clearances.refNo);
        this.generateReport();
        this.router.navigate(["homePage"]);

        } else {
          console.log(data);
          alert("Error Happened " + data.message);
        }
      },
      err => {
        console.log("error " + err.message);
        this.showSpinner = false;
      }
    );
  }

  generateReport(){
    this.showSpinner = true;
  
    console.log("generateReport "+this.clearances.refNo);
    this.userService.generateClearanceReport(this.clearances.refNo)
    .subscribe(
      data => {
        let blob = new Blob([data], {type: 'application/pdf'});
  
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.clearances.refNo+".pdf";
        link.click();
        this.showSpinner = false;
      }, (err) => {
        console.log("error ");
        console.log(err);
        this.showSpinner = false;
      });
   }

  close() {
    this.router.navigate(["homePage"]);
  }
}
