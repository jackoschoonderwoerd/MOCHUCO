import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AdminMaterialModule } from './admin-material.module';
import { AdminComponent } from './admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminVenueComponent } from './admin-venue/admin-venue.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminObjectComponent } from './admin-venue/admin-objects/admin-object/admin-object.component';
import { AdminObjectsComponent } from './admin-venue/admin-objects/admin-objects.component';
// https://www.npmjs.com/package/angular2-qrcode
import { QRCodeModule } from 'angular2-qrcode';








@NgModule({
  declarations: [
    AdminComponent,
    SignupComponent,
    AdminVenueComponent,
    LoginComponent,
    AdminObjectComponent,
    AdminObjectsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AdminMaterialModule,
    QRCodeModule



  ]
})
export class AdminModule { }