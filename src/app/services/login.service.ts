import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../utility/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint:string = 'http://localhost:8082/api/v1/';

  constructor(private httpClient: HttpClient) { }

 public doLogin(loginUser:user):
  Observable<any>{
    return this.httpClient.post(this.endpoint+"getUserByUserName",loginUser, 
    {responseType:'json'});
  }
}
