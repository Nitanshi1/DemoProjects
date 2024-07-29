import { Component } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { Food } from '../../shared/components/interfaces/dish';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { AddDishComponent } from '../../shared/components/add-dish/add-dish.component';
import { EditDishComponent } from '../../shared/components/edit-dish/edit-dish.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule,RouterOutlet,RouterModule,AddDishComponent,EditDishComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private foodService: MainService, private location: Location, public router: Router) { }

  foods?: Food[];

  getFoods(): void {
    this.foodService.getFoods()
      .subscribe(foods => this.foods = foods);
  }

  ngOnInit(): void {
    this.getFoods();
  }

  delete(food: Food): void {
    this.foods = this.foods?.filter(h => h !== food);
    this.foodService.deleteFood(food.id).subscribe();
  }

  goback(): void {
    this.location.back();
  }
}