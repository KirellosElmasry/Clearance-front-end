import { Component, OnInit } from '@angular/core';
import { changeablePersonData } from '../utility/changeablePersonalData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixed-personal-data',
  templateUrl: './fixed-personal-data.component.html',
  styleUrls: ['./fixed-personal-data.component.css']
})
export class FixedPersonalDataComponent implements OnInit {
 
  personData = new changeablePersonData();
  selectedFile: File;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    
    if (this.selectedFile) {
      console.log("File name : " + this.selectedFile.name);

      // this.restService.uploadFile(this.selectedFile, this.personData.referenceNumber).subscribe(res => {
      //   console.log("result " + res);
      // }, (err) => {
      //   console.log("error " + err);
      // });
    }
  }
  onUpload(){

  }

  next(){
    this.router.navigate(['changeablePersonalData']);

  }

  back(){
    this.router.navigate(['searchClearance']);
  }
}
