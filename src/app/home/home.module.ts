import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    ItemsListComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule
  ]
})
export class HomeModule { }
