import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: '',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(
    private postService:SubjectsService,
    private router:Router,
    private toastr:ToastrService
  ) { 
    let user=JSON.parse(localStorage.getItem("user"))
    if(!user){
      this.toastr.error("You need to login first")
      this.router.navigateByUrl("/login")
    }

  }

  ngOnInit(): void {
  }


  getFilter(filter) {
      this.postService.filterSubject.next(filter)
  }

}
