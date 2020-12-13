import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionModule } from '../reaction/reaction.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PostModule {
  id: Number;
  title: String;
  subject: String;
  author: String;
  time: String;
  reactions: ReactionModule[];
  nbliks:number
  nbdsliks:number
  public tags: String;
  constructor(){} 
}
 
