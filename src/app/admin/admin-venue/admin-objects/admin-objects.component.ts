import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MochucoObject } from 'src/app/pages/object/object.service';
import { AdminService, Location } from '../../admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ObjectService } from '../../../pages/object/object.service';

@Component({
    selector: 'app-admin-objects',
    templateUrl: './admin-objects.component.html',
    styleUrls: ['./admin-objects.component.scss']
})
export class AdminObjectsComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private adminService: AdminService,
        private router: Router,
        public authService: AuthService,
        public objectService: ObjectService) { }

    // objects: MochucoObject[];
    // form: FormGroup;
    editmode: boolean = false;
    venueId: string
    objects$: Observable<MochucoObject[]>
    venue$: Observable<Location>;
    venue: Location;
    // @ViewChild('qr') private grandParentRef: ElementRef<HTMLElement>
    // parentRef: any

    ngOnInit(): void {
        // const venueId = this.route.snapshot.paramMap.get('venueId');
        this.venueId = this.route.snapshot.paramMap.get('venueId');
        this.venue$ = this.adminService.getVenueObservable(this.venueId);
        this.adminService.getLocation(this.venueId).subscribe((venue: Location) => {
            this.venue = venue
        })
        this.objects$ = this.adminService.getObjects(this.venueId)
    }

    onAddObject() {
        this.router.navigate(['admin/admin-object', { venueId: this.venueId }])
    }

    onDownloadQrCode(url: string, fileName: string) {
        console.log(url, fileName);

    }
    onQrCode(e) {
        console.log(e)
    }
}


