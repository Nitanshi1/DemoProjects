import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { Food } from '../interfaces/dish';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,MatFormFieldModule,RouterOutlet,MatButtonModule,MatToolbarModule,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  data!:string;
  constructor(private router:Router){}
  search(){
    console.log(this.data);
    if(this.data.trim()===''){
      this.router.navigate(['/'])
    }
    else{
      this.router.navigate(['/search'],{ queryParams: { dishname:this.data} })
    }
    
    
   }
}
