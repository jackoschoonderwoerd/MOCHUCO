import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { SiteComponent } from './pages/site/site.component';
import { VenueComponent } from './pages/venue/venue.component';
import { ObjectComponent } from './pages/object/object.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        ScannerComponent,
        SiteComponent,
        VenueComponent,
        ObjectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxScannerQrcodeModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
