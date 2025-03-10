import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: '[app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  constructor(private itemsService: ItemsService) {}

  @Input() item!: Item;
  @Output() itemDeleted = new EventEmitter<string>();
  @Output() itemEdited = new EventEmitter<string>();

  onDeleteClick() {
    this.itemDeleted.emit(this.item.id);
  }

  onEditClick() {
    this.itemEdited.emit(this.item.id);
  }
}
