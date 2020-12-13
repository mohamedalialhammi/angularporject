import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModule } from '../model/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: String = environment.url;
   userSubject = new ReplaySubject<any>();
  userState = this.userSubject.asObservable();
  constructor(
    private httpClient:HttpClient
  ) {
    this.userSubject.next(JSON.parse(localStorage.getItem("user")))
   }
  login(user){
    return this.httpClient.get(this.url+`users?username=${user.username}&password=${user.password}&_limit=1`)
  }
  signup(user){
    return this.httpClient.post(this.url+`users`,user)
  }
}
