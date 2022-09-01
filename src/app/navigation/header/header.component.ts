import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectService } from '../../pages/object/object.service';
import { Observable } from 'rxjs';
import { ScannerService } from '../../pages/scanner/scanner.service';
import { UiService } from '../../shared/ui.service';
import { MatDialog } from '@angular/material/dialog';

import { MochucoComponent } from '../../pages/mochuco/mochuco.component';
import { AuthService } from '../../admin/auth/auth.service';
import { Venue, AdminService } from '../../admin/admin.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    venue: Venue



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public objectService: ObjectService,
        private scannerServcive: ScannerService,
        public uiService: UiService,
        private dialog: MatDialog,
        public authService: AuthService,
        private adminService: AdminService

    ) { }

    ngOnInit(): void {
        this.objectService.venue$.subscribe((venue: Venue) => {
            console.log(venue)
            this.venue = venue;
        })
    }

    onLogo() {
        this.dialog.open(MochucoComponent, {
            maxHeight: '80vh'
        })
    }
    onVenue() {
        this.router.navigateByUrl('venue');
        // this.objectService

    }
}
