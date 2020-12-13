import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  url: String = environment.url;
  contactusSubject = new ReplaySubject<any>();
  contactusState = this.contactusSubject.asObservable();
  constructor(
    private httpClient:HttpClient
  ) {
   }
   addcontact(contactus){
    return this.httpClient.post(this.url+`contactus`,contactus)
  }
}
