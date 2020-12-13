import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,
    private toastr : ToastrService,
    private router:Router) { }
  userForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('.*@esprit.tn$')]),
    gender: new FormControl('',[Validators.required,Validators.pattern('Male|Female')]),
    classe: new FormControl('Class...',[Validators.required,Validators.pattern('1A|2A|3A|3B|4TWIN|4BI')]),
  });

  
   get username(){
    return this.userForm.get('username');
  }
   get password(){
    return this.userForm.get('password');
  }
   get email(){
    return this.userForm.get('email');
  }
   get gender(){
    return this.userForm.get('gender');
  }
   get classe(){
    return this.userForm.get('classe');
  }
  
singup(){
  this.userService.signup(this.userForm.value).subscribe(
    (data:any)=>{
      this.toastr.success("Signup successfully")
      this.router.navigateByUrl("/login")
    }
  )

}
  ngOnInit(): void {
  }

}
