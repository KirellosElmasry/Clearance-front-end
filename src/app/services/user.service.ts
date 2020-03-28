import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = "http://localhost:8082/api/v1/";

  constructor(private httpClient: HttpClient) {}

  public getUserByEid(eid: string): Observable<any> {
    return this.httpClient.get(this.endpoint + "getSearchByEid?eid=" + eid, {
      responseType: "json"
    });
  }

  public addFixedPersonalData(formData): Observable<any> {
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
    return this.httpClient.get(this.endpoint + "getAllChurch", {
      responseType: "json"
    });
  }

  public updateClearanceFinal(json): Observable<any> {
    return this.httpClient.post(this.endpoint + "updateClearanceFinal", json, {
      responseType: "json"
    });
  }
}
