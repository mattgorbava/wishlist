import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  constructor(
    private fb: FormBuilder, 
    private itemsService: ItemsService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  itemId!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id')!;
      if (this.itemId) {
        this.loadItemData();
      }
    });
  }

  itemForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
    rating: [''],
    image: ['']
  });

  editItem() {
    const values = this.itemForm.value;
    
    this.itemsService.editItem(
      this.itemId,
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

  loadItemData(): void {
    this.itemsService.getItemById(this.itemId).subscribe(item => {
      this.itemForm.patchValue({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        rating: item.rating.toString(),
        image: item.image
      });
    });
  }

  get name() { return this.itemForm.get('name') as FormControl; }
  get description() { return this.itemForm.get('description') as FormControl; }
  get price() { return this.itemForm.get('price') as FormControl; }
  get rating() { return this.itemForm.get('rating') as FormControl; }
  get image() { return this.itemForm.get('image') as FormControl; }
}
