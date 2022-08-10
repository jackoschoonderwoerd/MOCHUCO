import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScannerComponent } from './pages/scanner/scanner.component';

import { ObjectComponent } from './pages/object/object.component';
import { VenueComponent } from './pages/venue/venue.component';
import { MochucoComponent } from './pages/mochuco/mochuco.component';
import { LogoComponent } from './pages/logo/logo.component';

const routes: Routes = [
    { path: '', redirectTo: 'logo', pathMatch: 'full' },
    { path: 'logo', component: LogoComponent },
    { path: 'home', component: HomeComponent },
    { path: 'scanner', component: ScannerComponent },
    { path: 'object', component: ObjectComponent },
    { path: 'venue', component: VenueComponent },
    { path: 'mochuco', component: MochucoComponent },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
