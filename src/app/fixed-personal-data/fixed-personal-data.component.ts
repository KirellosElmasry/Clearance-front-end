import { Component, OnInit } from '@angular/core';
import { personData } from '../utility/personalData';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fixed-personal-data',
  templateUrl: './fixed-personal-data.component.html',
  styleUrls: ['./fixed-personal-data.component.css']
})
export class FixedPersonalDataComponent implements OnInit {

  personData: personData;
  selectedFile: File;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.personData = history.state.data;
    console.log("eid " + this.personData.emirateId);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      console.log("File name : " + this.selectedFile.name);
    }
  }

  next() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('emirateId', this.personData.emirateId);
    formData.append('birthDate', this.personData.birthDate.toString());

    formData.append('birthLocation', this.personData.placeOfBirth);
    formData.append('baptismPlace', this.personData.placeOfBaptism);
    formData.append('baptism', this.personData.baptismDate.toString());

    formData.append('education', this.personData.edQualification);
    formData.append('educationDate', this.personData.graduateDate.toString());

    this.userService.addFixedPersonalData(formData).subscribe(
      data => {

        console.log("result " + data.code);
        if (data.code == "200") {
          this.personData.referenceNumber = data.refNo;
          this.router.navigate(['changeablePersonalData'], { state: { data: this.personData } });
        }else{
          console.log("error "+ data.message );
        }
      }, (err) => {
        console.log("error " + err.message);

      });

  }
}
