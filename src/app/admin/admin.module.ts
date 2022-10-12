import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminMaterialModule } from './admin-material.module';
import { AdminComponent } from './admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminVenueComponent } from './admin-venue/admin-venue.component';
import { LoginComponent } from './auth/login/login.component';

import { AdminObjectsComponent } from './admin-venue/admin-objects/admin-objects.component';

import { QRCodeModule } from 'angular2-qrcode';
import { AdminObjectsListItemComponent } from './admin-venue/admin-objects/admin-objects-list-item/admin-objects-list-item.component';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';

import { AdminObjectAudioComponent } from './admin-venue/admin-objects/admin-object/admin-object-audio/admin-object-audio.component';
import { DownloadQrComponent } from './admin-venue/admin-objects/admin-objects-list-item/download-qr/download-qr.component';


import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { AdminObjectComponent } from './admin-venue/admin-objects/admin-object/admin-object.component';





@NgModule({
    declarations: [

        AdminComponent,
        AdminObjectAudioComponent,
        AdminObjectComponent,
        AdminObjectsComponent,
        AdminObjectsListItemComponent,
        AdminVenueComponent,
        ConfirmDeleteComponent,
        DownloadQrComponent,
        LoginComponent,
        SignupComponent,

    ],
    imports: [
        AdminMaterialModule,
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        QRCodeModule,
        NgxQrcodeStylingModule,




    ]
})
export class AdminModule { }
