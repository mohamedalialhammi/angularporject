import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { 
    id : Number;
    username : String;
    password : String;
    email : String;
    gender : String;
    classe : String;
    constructor(){}
   

}
