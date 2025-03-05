import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/items');
  }

  addItem(name: string, description: string, price: number, rating: number, image: string) {
    return this.http.post('http://localhost:3000/items', { name, description, price, rating, image });
  }
}
