import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  providers: [ItemsService]
})
export class ItemsListComponent {
  constructor (private itemsService: ItemsService, private router: Router) {}

  items: Item[] = [];

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  navigateToAddItem(): void {
    this.router.navigate(['/home/items/add']);
  }
}
