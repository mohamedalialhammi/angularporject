import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {

  constructor(
    private postsService: SubjectsService,
    private toastr : ToastrService,
    private router:Router
  ) { }
  postForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(8)]),
    subject: new FormControl('',[Validators.required,Validators.minLength(20)]),
    tags: new FormControl('',[Validators.required,Validators.minLength(3)]),
  });
  get title(){
    return this.postForm.get('title');
  }
   get subject(){
    return this.postForm.get('subject');
  }
  get tags(){
    return this.postForm.get('tags');
  }
  postform(){
    if (localStorage.getItem('user')!=null)
    {   
    this.postsService.addsubject(this.postForm.value).subscribe(
      (data:any)=>{
        this.toastr.success("Your Post added successfully")
        this.router.navigateByUrl("/forum")
      }
    )
  }
  else{
    this.toastr.error("You Need to login")
  }
  }
  ngOnInit(): void {
  }

}
