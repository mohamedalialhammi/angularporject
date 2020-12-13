import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModule } from 'src/app/model/post/post.module';
import { CommentsService } from 'src/app/shared/comments.service';
import { ReactionService } from 'src/app/shared/reaction.service';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  posts:PostModule[] = []
  allposts:PostModule[] = []
  nblikes:number
  nbdislikes:number
  nbcomments:number
  constructor( private postService: SubjectsService,
    private reactionService: ReactionService,
    private commentService: CommentsService) { 
      this.postService.getallsubjects().subscribe(
        (data:any)=>{
          console.log("ff")
          if (data)
          {
            this.posts = data
            this.allposts=data
          }
        }
        
      )
    }

  ngOnInit(): void {
    
    

    this.postService.filterState.subscribe(
      data=>{
        if(data){
          if(data.newfilter){
            
            if(data.searchTxt){
              this.postService.search(data.searchTxt).subscribe(
                (data:any)=>this.posts=data
              )

            }
            else
              this.posts=this.allposts.filter(eleme=>eleme.tags==data.filter)

              data.newfilter=false
          }

        }
      }
    )
  
  }

  calculLikes(tab){
    tab.forEach(element => {
      let nbliks=0
      let nbdsliks=0
      element.reactions.forEach(reaction => {
          if(reaction.likedislike)
            nbliks++
          else
            nbdsliks++

      });
      element.nbliks=nbliks
      element.nbdsliks=nbdsliks
    });
    return tab
  }

}