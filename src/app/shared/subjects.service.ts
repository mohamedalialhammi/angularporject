import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostModule } from '../model/post/post.module';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  url: String = environment.url;
  filterSubject = new ReplaySubject<any>();
  filterState = this.filterSubject.asObservable();
  pipe = new DatePipe('en-US');
  now = Date.now();
  user : any
  constructor(
    private httpClient:HttpClient
  ) {
   }
   addsubject(post : PostModule){
     
     post.time = this.pipe.transform(this.now,'dd-MM-yy').toString()
     post.author =JSON.parse(localStorage.getItem('user')).username

    return this.httpClient.post(this.url+`posts`,post)
  }

  getallsubjects(){
    return this.httpClient.get<PostModule[]>(this.url+`posts?_embed=reactions`)
  }
  getsubjectbyid(id){
    return this.httpClient.get(this.url+`posts/${id}`)
  }

  deletesubjcetbyid(id){
    return this.httpClient.delete(this.url+`posts/${id}`)
  }

  
  updatesubject(post : PostModule,postid){
    post.time = this.pipe.transform(this.now,'dd-MM-yy').toString()
    post.author =JSON.parse(localStorage.getItem('user')).username
   return this.httpClient.put(this.url+`posts/${postid}`,post)
 }

 search(search){
  return this.httpClient.get(this.url+`posts?q=${search}&_embed=reactions`)}

}
