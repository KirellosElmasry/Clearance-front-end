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
}