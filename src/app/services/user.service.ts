import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:8082/api/v1/';

  constructor(private httpClient: HttpClient) { }

  public getUserByEid(eid: string):
    Observable<any> {
    return this.httpClient.post(this.endpoint + "getSearchByEid", eid,
      { responseType: 'json' });
  }

  public addFixedPersonalData(formData):
    Observable<any> {
    return this.httpClient.post(this.endpoint + "addPersonalData", formData,
      { responseType: 'json' });
  }

  public addPreviousEngagment(formData):
    Observable<any> {
    return this.httpClient.post(this.endpoint + "addPreviousEngagment", formData,
      { responseType: 'json' });
  }

  public updateEngagmentClearance(json):
    Observable<any> {
    return this.httpClient.post(this.endpoint + "updateEngagmentClearance", json,
      { responseType: 'json' });
  }

  public updateMarrageClearance(json):
  Observable<any> {
  return this.httpClient.post(this.endpoint + "updateMarrageClearance", json,
    { responseType: 'json' });
}

}