import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScannerComponent } from './pages/scanner/scanner.component';

import { ObjectComponent } from './pages/object/object.component';
import { VenueComponent } from './pages/venue/venue.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: 'object', component: ObjectComponent },
  { path: 'venue', component: VenueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
