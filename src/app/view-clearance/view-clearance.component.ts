import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { clearanceData } from '../utility/clearanceData';
import { dto } from '../utility/dto';


@Component({
  selector: 'app-view-clearance',
  templateUrl: './view-clearance.component.html',
  styleUrls: ['./view-clearance.component.css']
})
export class ViewClearanceComponent implements OnInit {

  clearanceData: clearanceData;
  result = new dto();

  constructor(private router: Router,  private userService: UserService) { }

  ngOnInit() {
    this.clearanceData = history.state.data[0];
    console.log(this.clearanceData);
  }

  back(){
    this.router.navigate(['searchClearance']);
  }

  generateReport(){
    // window.print();
    console.log("generateReport "+this.clearanceData.refNo);
    this.userService.generateClearanceReport(this.clearanceData.refNo)
    .subscribe(
      data => {
        let blob = new Blob([data], {type: 'application/pdf'});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.clearanceData.refNo+".pdf";
        link.click();
      }, (err) => {
        console.log("error ");
        console.log(err);
      });
  }
}
