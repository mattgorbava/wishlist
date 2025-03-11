import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    HomeComponent,
    ItemsListComponent,
    AddItemComponent,
    EditItemComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    FormsModule
  ]
})
export class HomeModule { }
