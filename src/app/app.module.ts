



// import { SelectLanguageComponent } from './navigation/footer/select-language/select-language.component';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { LogoComponent } from './pages/logo/logo.component';
import { MochucoComponent } from './pages/mochuco/mochuco.component';
import { NgModule } from '@angular/core';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ObjectComponent } from './pages/object/object.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { QRCodeModule } from 'angular2-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TestComponent } from './pages/test/test.component';
import { UiDialogComponent } from './shared/ui-dialog/ui-dialog.component';
import { VenueComponent } from './pages/venue/venue.component';
import { VisitsComponent } from './admin/admin-venue/admin-objects/admin-objects-list-item/visits/visits.component';
// import { AdminVenueComponent } from './admin/admin-venue/admin-venue.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        ScannerComponent,
        // AdminVenueComponent,
        ObjectComponent,
        MochucoComponent,
        TestComponent,
        LogoComponent,
        VisitsComponent,
        UiDialogComponent,
        VenueComponent
        // SelectLanguageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxScannerQrcodeModule,
        AppMaterialModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        BrowserAnimationsModule,
        QRCodeModule,
        ReactiveFormsModule,



        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            scope: './',

            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',

        }),

        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        // ServiceWorkerModule.register('ngsw-worker.js', {
        //   enabled: environment.production,
        //   // Register the ServiceWorker as soon as the application is stable
        //   // or after 30 seconds (whichever comes first).
        //   registrationStrategy: 'registerWhenStable:30000'
        // }),

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
