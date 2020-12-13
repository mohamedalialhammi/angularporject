import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/shared/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(
    private contactusService: ContactusService,
    private toastr : ToastrService,
    private router:Router
  ) { }
  contactusForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('.*@esprit.tn$')]),
    body: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });
  
  get body(){
    return this.contactusForm.get('body');
  }
   get email(){
    return this.contactusForm.get('email');
  }

  contactform(){
    this.contactusService.addcontact(this.contactusForm.value).subscribe(
      (data:any)=>{
        this.toastr.success("Your message submited successfully")
        this.router.navigateByUrl("/")
      }
    )
  
  }
  ngOnInit(): void {
  }
}
