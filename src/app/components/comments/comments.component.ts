import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentModule } from 'src/app/model/comment/comment.module';
import { CommentsService } from 'src/app/shared/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments:CommentModule[]
  @Input() post_id:Number
  body:String=""
  user=JSON.parse(localStorage.getItem('user'))
  constructor(private toastr:ToastrService,
    private commentService:CommentsService) { }

  ngOnInit(): void {
  }
  addcomment(){
    if(this.body.length==0){
      this.toastr.error("Comment content is required")
      return
    }
    let comment=new CommentModule()
    comment.body=this.body
    comment.commentor =JSON.parse(localStorage.getItem('user')).username
    comment.post_id=this.post_id
    console.log(comment)
    this.commentService.addcomment(comment).subscribe(
      data=>
      {
        this.toastr.success("comment added")
        this.comments.push(comment)
      }
    )
  }
  deletecomment(id,index){
    if(confirm("delete comment"))
    this.commentService.deletecommentbyid(id).subscribe(
      data=>
      {
        this.toastr.success("your comment has been deleted")
        this.comments.splice(index,1)
      }
    )
  }

}
