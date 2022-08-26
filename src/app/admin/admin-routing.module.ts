import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminVenueComponent } from './admin-venue/admin-venue.component';
import { AdminObjectComponent } from './admin-venue/admin-objects/admin-object/admin-object.component';
import { AdminObjectsComponent } from './admin-venue/admin-objects/admin-objects.component';
import { VisitsComponent } from './admin-venue/admin-objects/admin-objects-list-item/visits/visits.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-venue', component: AdminVenueComponent },
    { path: 'admin-objects', component: AdminObjectsComponent },
    { path: 'admin-object', component: AdminObjectComponent },
    { path: 'visits', component: VisitsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
