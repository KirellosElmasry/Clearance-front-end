import { Component, Input, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { clearanceData } from '../utility/clearanceData';

@Component({
  selector: 'app-fixed-personal-data',
  templateUrl: './fixed-personal-data.component.html',
  styleUrls: ['./fixed-personal-data.component.css']
})
export class FixedPersonalDataComponent implements OnInit {

  @Input() clearancefromPrev: clearanceData;
  
  personData = new personData();
  clearances: clearanceData;
  selectedFile: File;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    debugger;
    this.clearances = history.state.data;
    if(typeof this.clearances != "undefined" && typeof this.clearances.personalData != "undefined" )
      this.personData = this.clearances.personalData;

    console.log(this.clearances);

    console.log("clearancefromPrev");
    console.log(this.clearancefromPrev);
    // for testing
    //this.personData = new personData();
    //this.personData.emirateId = "555";
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      console.log("File name : " + this.selectedFile.name);
    }
  }

  next() {
    debugger
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('emirateId', this.clearances.emirateId);
    formData.append('name', this.personData.name);
    formData.append('birthDate', this.personData.birthDate.toString());
    console.log(this.personData.birthDate.toString());

    formData.append('birthLocation', this.personData.birthLocation);
    formData.append('baptismPlace', this.personData.baptismPlace);
    formData.append('baptism', this.personData.baptism.toString());

    formData.append('education', this.personData.education);
    formData.append('educationDate', this.personData.educationDate.toString());

    this.userService.addFixedPersonalData(formData).subscribe(
      data => {

        console.log("fixed personal data next response " );
        console.log(data);
        if (data.code == "200") {
          //this.personData.referenceNumber = data.refNo;
          this.router.navigate(['changeablePersonalData'], { state: { data: this.clearances } });
        } else {
          alert("error " + data.msg);
        }
      }, (err) => {
        alert("error " + err.error.message);

      });

  }
}
