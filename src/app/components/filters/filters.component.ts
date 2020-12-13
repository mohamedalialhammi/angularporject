import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SubjectsService } from 'src/app/shared/subjects.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  constructor(
    private postService:SubjectsService
  ) { }
  tags=[]
  search=""
  ngOnInit(): void {
    
    this.postService.getallsubjects().subscribe(
      (data:any)=>{
        if (data)
        {
          data.forEach(element => {
            
          this.tags.push(element.tags)
          });
        }
      }
    )
  }

  sendFilter(filter) {
      this.notifyParent.emit({filter,newfilter:true});
  }

  doSearch(){
    this.notifyParent.emit({searchTxt:this.search,newfilter:true});
  }

}
