import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  providers: [ItemsService]
})
export class ItemsListComponent {
  constructor (private itemsService: ItemsService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {}

  items: Item[] = [];
  email: string = sessionStorage.getItem('email')! || localStorage.getItem('email')!;
  fullName: string = '';
  sortBy: string = '';

  deleteItemForm = this.fb.group({
    id: ['']
  });

  editItemForm = this.fb.group({
    id: ['']
  });

  ngOnInit(): void {
    this.authService.getUserByEmail(this.email!).subscribe((data) => {
      this.fullName = data[0].fullName;
      this.itemsService.getUserItems(data[0].id).subscribe((data: Item[]) => {
        this.items = data;
      });
    });
  }

  navigateToAddItem(): void {
    const email = sessionStorage.getItem('email') || localStorage.getItem('email');
    this.authService.getUserByEmail(email!).subscribe((data) => {
      this.router.navigate(['/home/items/add', data[0].id]);
    });
  }

  deleteItem(id: string): void {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }

  editItem(id: string): void {
    this.router.navigate([`/home/items/edit/${id}`]);
  }

  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  searchItems(filter: string): void {
    if (filter.length !== 0) {
      if (this.items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).length !== 0) {
        this.items = this.items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
      } else {
        return;
      }
    } else {
      this.authService.getUserByEmail(this.email!).subscribe((data) => {
        this.itemsService.getUserItems(data[0].id).subscribe((data: Item[]) => {
          this.items = data;
        });
      });
    }
  }

  sortItems(): void {
    if (this.sortBy === 'name') {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'price') {
      this.items.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'rating') {
      this.items.sort((a, b) => a.rating - b.rating);
    } else if (this.sortBy === 'date') {
      this.items.sort((a, b) => new Date(b.formatDate).getTime() - new Date(a.formatDate).getTime());
    } else if (this.sortBy === 'description') {
      this.items.sort((a, b) => a.description.localeCompare(b.description));
    }
  }
}
