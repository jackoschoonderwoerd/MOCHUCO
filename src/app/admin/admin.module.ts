import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VenueComponent } from './venue/venue.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VenueComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
