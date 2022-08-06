import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MochucoObject } from 'src/app/pages/object/object.service';
import { AdminService, Venue } from '../../admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-admin-objects',
    templateUrl: './admin-objects.component.html',
    styleUrls: ['./admin-objects.component.scss']
})
export class AdminObjectsComponent implements OnInit, AfterViewInit {

    constructor(
        private route: ActivatedRoute,
        private adminService: AdminService,
        private router: Router,
        public authService: AuthService) { }

    // objects: MochucoObject[];
    form: FormGroup;
    editmode: boolean = false;
    venueId: string
    objects$: Observable<MochucoObject[]>
    venue$: Observable<Venue>;
    venue: Venue;
    @ViewChild('qr') private grandParentRef: ElementRef<HTMLElement>
    parentRef: any

    ngOnInit(): void {
        this.initForm()
        const venueId = this.route.snapshot.paramMap.get('venueId');
        this.venueId = this.route.snapshot.paramMap.get('venueId');
        this.venue$ = this.adminService.getVenueObservable(venueId);
        this.adminService.getVenue(venueId).subscribe((venue: Venue) => {
            this.venue = venue
        })
        this.objects$ = this.adminService.getObjects(this.venueId)
        // setTimeout(() => {
        //     const imageStringRaw = this.grandParentRef.nativeElement.children[0].children[0].attributes[2];
        //     console.log(imageStringRaw)
        // }, 1000)
    }

    ngAfterViewInit(): void {
    }

    initForm() {

    }
    onAddObject() {
        this.router.navigate(['admin/admin-object', { venueId: this.venueId }])
    }
    onAdmin() {
        this.router.navigate(['admin'])
    }
    onEditObject(objectId: string) {
        console.log(objectId)
        this.router.navigate(['admin/admin-object', { venueId: this.venueId, objectId: objectId, venueName: this.venue.nameNl }])
    }


    onDeleteObject(objectId: string) {
        if (window.confirm('are you sure')) {
            console.log(objectId);
            this.adminService.deleteObject(this.venueId, objectId)
                .then(res => { console.log(res) })
                .catch(err => console.log(err));
        } else {
            alert('nothing deleted');
        }

    }
    onDownloadQrCode(url: string, fileName: string) {
        console.log(url, fileName);

    }
    onQrCode(e) {
        console.log(e)
    }
}

"data: image/png;base64,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"
