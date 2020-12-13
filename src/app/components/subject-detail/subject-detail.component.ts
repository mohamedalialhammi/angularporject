import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentModule } from 'src/app/model/comment/comment.module';
import { PostModule } from 'src/app/model/post/post.module';
import { ReactionModule } from 'src/app/model/reaction/reaction.module';
import { CommentsService } from 'src/app/shared/comments.service';
import { ReactionService } from 'src/app/shared/reaction.service';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {

  constructor(
    private actroute: ActivatedRoute,
    private postService : SubjectsService,
    private commentService : CommentsService,
    private toastr : ToastrService,
    private router: Router,
    private reactionService: ReactionService
  ) { }
  post : PostModule
comments: CommentModule[]
post_id:string
nblike:number
nbdislike:number
show=false
update=false
postForm ;
get title(){
  return this.postForm.get('title');
}
 get subject(){
  return this.postForm.get('subject');
}
get tags(){
  return this.postForm.get('tags');
}
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user"))
    
    this.actroute.paramMap.subscribe(
      param=>{
        this.post_id=param.get("id")
        this.postService.getsubjectbyid(param.get("id")).subscribe(
          (data :any)=>{
          this.post = data
          this.show=user.username==this.post.author
          this.postForm= new FormGroup({
            title: new FormControl(this.post.title,[Validators.required,Validators.minLength(8)]),
            subject: new FormControl(this.post.subject,[Validators.required,Validators.minLength(20)]),
            tags: new FormControl(this.post.tags,[Validators.required,Validators.minLength(3)]),
          });
          },
          error=>{
            this.toastr.info("THIS SUBJECT IS UNFOUND")
            this.router.navigateByUrl("/forum")
          }

        )
        this.commentService.getcommentsbyid(param.get("id")).subscribe(
          data=>{
            this.comments = data
          }
        )
      }
    )
    this.reactionService.getdislikesforsubject(this.post_id).subscribe(
      (data:any)=>
      {
        this.nbdislike=data.length
      }
    )
    this.reactionService.getlikesforsubject(this.post_id).subscribe(
      (data:any)=>
      {
        this.nblike=data.length
      }
    )
  }

  reaction(val){
    let user = JSON.parse(localStorage.getItem("user"))
      this.reactionService.getreaction(user.id,this.post_id).subscribe(
        (data:any)=>{
          let reaction = new ReactionModule()
          if (data.length==0){
            reaction.postId=parseInt(this.post_id)
            reaction.liker=user.id
            reaction.likedislike=val
            this.reactionService.addreaction(reaction).subscribe(
              data=>{
                if (val){
                  this.nblike++
                  this.nbdislike=this.nbdislike-1<0 ? 0 :this.nbdislike-1
                }
                else{
                  this.nblike=this.nblike-1<0 ? 0 :this.nblike-1
                  this.nbdislike++
                }
                this.toastr.success("Your reaction is saved")
              }
            )
          }
          else{
            reaction=data[0]
            if(reaction.likedislike==val){
              this.toastr.info("you already voted")
              return
            }
            reaction.likedislike=val

            this.reactionService.pudatereaction(reaction).subscribe(
              data=>{
                if (val){
                  this.nblike++
                  this.nbdislike=this.nbdislike-1<0 ? 0 :this.nbdislike-1
                }
                else{
                  this.nblike=this.nblike-1<0 ? 0 :this.nblike-1
                  this.nbdislike++
                }
                this.toastr.info("we've changed your reaction")
              }
            )
          }
        }
      )
  }
  deletesubject(){
    if(confirm("Delete subject"))
    this.postService.deletesubjcetbyid(this.post_id).subscribe(
      data=>
      {
        this.toastr.success("your subject has been deleted")
        this.router.navigateByUrl("/forum")
      }
    )
  }

  updateform(){
    this.postService.updatesubject(this.postForm.value,this.post_id).subscribe(
      (data:any)=>{
         data=this.postForm.value
        this.post.title=data.title
        this.post.subject=data.subject
        this.post.tags=data.tags
        this.toastr.success("Subject updated")
        this.update=false
      }
    )
  }
  goupdate(){
    this.update=true
  }

  cancel(){
    this.update=false
  }
}
