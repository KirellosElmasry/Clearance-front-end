import { Component, OnInit } from '@angular/core';
import { clearanceData } from '../utility/clearanceData';
import { personData } from '../utility/personalData';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.css']
})
export class PreviewPageComponent implements OnInit {

  clearances : clearanceData;
  personData: personData;
  
  constructor() {

   }

  ngOnInit() {
    this.clearances = history.state.data;
    this.personData = this.clearances.personalData;
  }

}
