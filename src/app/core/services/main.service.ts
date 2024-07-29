// src/app/food.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from '../../shared/components/interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private foodsUrl = 'api/foods'; 

  httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodsUrl)
      .pipe(
        catchError(this.handleError<Food[]>('getFoods', []))
      );
  }

  getFood(id: number): Observable<Food> {
    const url = `${this.foodsUrl}/${id}`;
    return this.http.get<Food>(url).pipe(
      catchError(this.handleError<Food>(`getFood id=${id}`))
    );
  }

  updateFood(food: Food): Observable<any> {
    return this.http.put(this.foodsUrl, food, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateFood'))
    );
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.foodsUrl, food, this.httpOptions).pipe(
      catchError(this.handleError<Food>('addFood'))
    );
  }


  deleteFood(id: number): Observable<Food> {
    const url = `${this.foodsUrl}/${id}`;
    return this.http.delete<Food>(url, this.httpOptions).pipe(
      catchError(this.handleError<Food>('deleteFood'))
    );
  }
  search(term:string):Observable<Food[]>{
    return this.http.get<Food[]>(`${this.foodsUrl}/?dishname=${term}`).pipe(
      catchError(this.handleError<Food[]>('search'))
)
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
