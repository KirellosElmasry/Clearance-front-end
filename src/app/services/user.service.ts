import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = "http://localhost:8082/api/v1/";


  constructor(private httpClient: HttpClient) { }

  public getUserByEid(eid: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'responseType': "json"
      })
    };

    return this.httpClient.post(this.endpoint + "getSearchByEid?eid="+eid, httpOptions);
  }

  public addFixedPersonalData(formData): Observable<any> {
    debugger
    return this.httpClient.post(this.endpoint + "addPersonalData", formData, {
      responseType: "json"
    });
  }

  public addNewClearance(json): Observable<any> {
    return this.httpClient.post(
      this.endpoint + "addNewClearance",
      json,
      { responseType: "json" }
    );
  }

  public addPreviousEngagment(formData): Observable<any> {
    return this.httpClient.post(
      this.endpoint + "addPreviousEngagment",
      formData,
      { responseType: "json" }
    );
  }

  public updateEngagmentClearance(json): Observable<any> {
    return this.httpClient.post(
      this.endpoint + "updateEngagmentClearance",
      json,
      { responseType: "json" }
    );
  }

  public updateMarrageClearance(json): Observable<any> {
    return this.httpClient.post(
      this.endpoint + "updateMarrageClearance",
      json,
      { responseType: "json" }
    );
  }

  public addPreviousMarrage(json): Observable<any> {
    return this.httpClient.post(this.endpoint + "addPreviousMarrage", json, {
      responseType: "json"
    });
  }

  public addPreviousChild(json): Observable<any> {
    return this.httpClient.post(this.endpoint + "addPreviousChild", json, {
      responseType: "json"
    });
  }

  public updateChildClearance(json): Observable<any> {
    return this.httpClient.post(this.endpoint + "updateChildClearance", json, {
      responseType: "json"
    });
  }
  public getAllChurch(): Observable<any> {
    return this.httpClient.post(this.endpoint + "getAllChurch", null, {
      responseType: "json"
    });
  }

  public updateClearanceFinal(json): Observable<any> {
    return this.httpClient.post(this.endpoint + "updateClearanceFinal", json, {
      responseType: "json"
    });
  }

  public getClearanceByEid(eid: string): Observable<any> {
    return this.httpClient.post(this.endpoint + "getClearanceByEid?eid="+eid, {
      responseType: "json"
    });
  }

  generateClearanceReport(refNo: string): Observable<any> {
    return this.httpClient.get(this.endpoint + "generateClearanceForm?refNo="+refNo, 
    {  responseType: 'blob' as 'json'});
  }

  public generateReport(refNo :string, showSpinner: boolean){
    // window.print();
    console.log("generateReport "+refNo);
    this.generateClearanceReport(refNo)
    .subscribe(
      data => {
        let blob = new Blob([data], {type: 'application/pdf'});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = refNo+".pdf";
        link.click();
        showSpinner = false;
      }, (err) => {
        console.log("error ");
        console.log(err);
        showSpinner = false;
      });
  }
}
