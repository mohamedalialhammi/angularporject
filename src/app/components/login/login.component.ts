import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModule } from 'src/app/model/user/user.module';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService : UserService,
    private toaster : ToastrService,
    private router: Router
  ) { }
  user : UserModule= new UserModule();
  username: String="";
  password: String="";
  ngOnInit(): void {
  }
  login(){
    if (this.username.length==0)
    {
      this.toaster.error("Username required")
      return
    }
    if (this.password.length < 8){
      this.toaster.error("password must have at least 8 characters")
      return  
    }
    this.userService.login({username:this.username, password:this.password}).subscribe(
      (data:any)=>{
        if(data.length!=0)
        {
          localStorage.setItem("user",JSON.stringify(data[0]))
          this.toaster.success("you are logedin")
          this.userService.userSubject.next(data[0])
          this.router.navigateByUrl("/")
        }
       
        else
        this.toaster.error("User not found")
        
      }
    )
  }

}
