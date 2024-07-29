import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MainService } from '../../../core/services/main.service';
import { Food } from '../interfaces/dish';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,NgFor,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private activatedroute:ActivatedRoute,private foodService:MainService ,public router:Router){}
  dishname!:any;
  previousdishname!:any;
  mysearchfood!:Food[];
  ngDoCheck(){
      
      this.dishname=this.activatedroute.snapshot.queryParamMap.get('dishname')
      if(this.previousdishname!=this.dishname){
        this.previousdishname=this.dishname;
        console.log(this.dishname)
        this.foodService.search(this.dishname).subscribe((d)=>{
           this.mysearchfood=d
        })
      }
      
  }
  delete(id:number){
    this.mysearchfood=this.mysearchfood.filter((c)=>c.id!=id);
    this.foodService.deleteFood(id).subscribe();
  }
}