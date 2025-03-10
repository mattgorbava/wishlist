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
      this.router.navigate(['/home/items/add'], { state: { user: data[0] } });
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
}
