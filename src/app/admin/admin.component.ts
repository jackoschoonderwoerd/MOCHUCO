import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService, Venue } from './admin.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { ObjectService } from '../pages/object/object.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    public myAngularxQrCode: string = null;
    venues$: Observable<Venue[]>

    constructor(
        private adminService: AdminService,
        private router: Router,
        public authService: AuthService,
        private objectService: ObjectService
    ) {
        this.myAngularxQrCode = 'tutsmake.com';
    }

    ngOnInit(): void {
        this.venues$ = this.adminService.getVenues();
        // this.adminService.getVenues().subscribe(data => console.log(data))
        // this.adminService.setVenueToZero()
        this.objectService.setVenue(null)
    }
    onDeleteVenue(id: string) {
        console.log(id);
        if (window.confirm('are you sure?')) {
            this.adminService.deleteVenue(id)
                .then(data => console.log(data))
                .catch(err => console.log(err));
        } else {
            alert('nothing delete')
        }
    }
    onEditVenue(venueId: string) {
        // console.log(venueId);
        this.objectService.setVenue(venueId);
        this.router.navigate(['/admin/admin-venue', { id: venueId }]);

    }

    onAddVenue() {
        this.router.navigateByUrl('admin/admin-venue');
    }
    onLogOut() {
        this.authService.logOut()
    }
    ngOnDestroy(): void {
        console.log('admin component destroyed')
        this.objectService.setVenue(null)
    }
}
