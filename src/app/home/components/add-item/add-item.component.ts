import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../interfaces/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  constructor(private fb: FormBuilder, private itemsService: ItemsService, private router: Router) {}

  itemForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
    rating: [''],
    image: ['']
  });

  addItem() {
    const values = this.itemForm.value;
    
    this.itemsService.addItem(
      values.name!,
      values.description!,
      parseFloat(values.price!), 
      parseFloat(values.rating!),
      values.image!
    ).subscribe(() => {
      this.itemForm.reset();
    });

    this.router.navigate(['/home/items']);
  }

  get name() { return this.itemForm.get('name') as FormControl; }
  get description() { return this.itemForm.get('description') as FormControl; }
  get price() { return this.itemForm.get('price') as FormControl; }
  get rating() { return this.itemForm.get('rating') as FormControl; }
  get image() { return this.itemForm.get('image') as FormControl; }
}
