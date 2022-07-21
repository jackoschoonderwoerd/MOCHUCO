import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { SiteComponent } from './pages/site/site.component';
import { ObjectComponent } from './pages/object/object.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'site', component: SiteComponent },
  { path: 'home', component: HomeComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: 'object', component: ObjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
