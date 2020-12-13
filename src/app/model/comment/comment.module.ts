import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommentModule { 
  id:Number;
  body:String;
  commentor:String;
  post_id:Number;
  constructor(){} 
}
