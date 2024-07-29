import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { Food } from '../../shared/components/interfaces/dish';
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor,CommonModule,NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private foodService: MainService, private location: Location, public router: Router) { }
  foods: Food[] = [];

  getFoods(): void {
    this.foodService.getFoods()
      .subscribe(foods => this.foods = foods);
  }

  ngOnInit(): void {
    this.getFoods();
  }

  delete(food: Food): void {
    if (confirm(`Are you sure you want to delete ${food.dishname}?`)) {
      this.foodService.deleteFood(food.id).subscribe(() => {
        this.foods = this.foods.filter(f => f.id !== food.id);

      });
    }
  }

  goback(): void {
    this.location.back();
  }
}

