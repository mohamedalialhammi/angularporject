import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentModule } from '../model/comment/comment.module';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url: String = environment.url;
  constructor(
    private httpclient : HttpClient
  ) { }

  getcommentsbyid(id){
    return this.httpclient.get<CommentModule[]>(this.url+`comments/?post_id=${id}`)
  }
  addcomment(comment : CommentModule){
    
   return this.httpclient.post(this.url+`comments`,comment)
 }
 deletecommentbyid(id){
   console.log(id)
  return this.httpclient.delete(this.url+`comments/${id}`)
}
}
