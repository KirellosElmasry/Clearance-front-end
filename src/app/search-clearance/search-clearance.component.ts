import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { dto } from '../utility/dto';
import { personData } from '../utility/personalData';

@Component({
  selector: 'app-search-clearance',
  templateUrl: './search-clearance.component.html',
  styleUrls: ['./search-clearance.component.css']
})
export class SearchClearanceComponent implements OnInit {

  personalData = new personData();

  result = new dto();
  showNewClearance: boolean;
  showViewClearance: boolean;
  showcreateOtherClearance: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  searchPerson() {

    this.userService.getUserByEid(this.personalData.emirateId)
      .subscribe(
        data => {
          this.result = data;

          //show buttons acording to return code
          if (this.result.code == 200) {
            console.log("code 200 ");
            this.showNewClearance = true;
          } else if (this.result.code == 201) {
            this.showViewClearance = true;

            console.log("code 201 ");
          }
          else if (this.result.code == 202) {
            console.log("code 202 ");
            this.showViewClearance = true;
            this.showcreateOtherClearance = true;
          }
          else {
            console.log("error " + this.result.message);
          }
        }, (err) => {
          console.log("error " + err.message);
          this.result.message = err.message;
        });
  }

  newClearance() {
    console.log("newClearance");
    
    this.router.navigate(['fixedPersonalData'], { state: { data: this.personalData } });
  }
  viewClearance() {
    console.log("viewClearance");
  }
  createOtherClearance() {
    console.log("createOtherClearance");
    this.router.navigate(['fixedPersonalData']);
  }
}
