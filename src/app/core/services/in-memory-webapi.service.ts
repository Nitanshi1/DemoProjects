import { Injectable } from '@angular/core';
import { Food } from '../../shared/components/interfaces/dish';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class InMemoryWebapiService implements InMemoryDbService {
  createDb() {

  
    const foods = [
      { id: 1, dishname: 'Pizza', description: 'Delicious cheese pizza', price: '10', image: '/images/pizza.jpeg' },
      { id: 2, dishname: 'Burger', description: 'Juicy beef burger', price: '8', image: '/images/burger.jpeg' },
      { id: 3, dishname: 'Pasta', description: 'Creamy Alfredo pasta', price: '12', image: '/images/pasta.jpeg' },
      { id: 4, dishname: 'Salad', description: 'Fresh garden salad', price: '6', image: '/images/fruit2.jpeg' },
      { id: 5, dishname: 'Sushi', description: 'Assorted sushi platter', price: '15', image: '/images/sushi.jpeg' }
    ];
   
    return { foods };
  }
  

  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 1;
  }
}
