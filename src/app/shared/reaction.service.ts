import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  url: String = environment.url;
  constructor(
    private httpClient:HttpClient
  ) { }
  addreaction(reaction){
    return this.httpClient.post(this.url+"reactions",reaction)
  }
  pudatereaction(reaction){
    return this.httpClient.patch(this.url+"reactions/"+reaction.id,reaction) 
  }
  getreaction(user_id,post_id){
    return this.httpClient.get(this.url+`reactions?postId=${post_id}&liker=${user_id}`)
  }
  getlikesforsubject(post_id){
    return this.httpClient.get(this.url+`reactions?postId=${post_id}&likedislike=1`)
  }
  getdislikesforsubject(post_id){
    return this.httpClient.get(this.url+`reactions?postId=${post_id}&likedislike=0`)
  }
}
