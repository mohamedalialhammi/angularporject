import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/model/user/user.module';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:UserModule
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userState.subscribe(
      (data:any)=>{
        if (data)
        {
          this.user=new UserModule();
          this.user.id=data.id;
          this.user.username=data.username;
          this.user.email=data.email;
          this.user.classe=data.classe;
          this.user.gender=data.gender;
          this.user.password=data.password;
         
        }
        else
        this.user=null
      }
    )
  }
  logout(){
this.userService.userSubject.next(null)
localStorage.removeItem("user")
  }

}
