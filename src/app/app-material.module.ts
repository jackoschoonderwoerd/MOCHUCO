import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule
    ]
})

export class AppMaterialModule { }
