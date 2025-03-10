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

  addItem(userId:string, name: string, description: string, price: number, rating: number, image: string) {
    return this.http.post('http://localhost:3000/items', { userId, name, description, price, rating, image });
  }

  deleteItem(id: string) {
    return this.http.delete(`http://localhost:3000/items/${id}`);
  }

  editItem(id: string, name: string, description: string, price: number, rating: number, image: string) {
    return this.http.patch(`http://localhost:3000/items/${id}`, { name, description, price, rating, image });
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`http://localhost:3000/items/${id}`);
  }

  getUserItems(userId: string): Observable<Item[]> {
    return this.http.get<Item[]>(`http://localhost:3000/items?userId=${userId}`);
  }
}
