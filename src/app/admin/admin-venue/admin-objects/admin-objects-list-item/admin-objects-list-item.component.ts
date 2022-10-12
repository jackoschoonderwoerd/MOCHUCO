import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/admin/admin.service';
import { MochucoObject } from '../../../../pages/object/object.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Options } from 'ngx-qrcode-styling';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../../../../pages/test/test.component';
import { DownloadQrComponent } from './download-qr/download-qr.component';


@Component({
    selector: 'app-admin-objects-list-item',
    templateUrl: './admin-objects-list-item.component.html',
    styleUrls: ['./admin-objects-list-item.component.scss']
})
export class AdminObjectsListItemComponent implements OnInit {


    @Input() public mochucoObject: MochucoObject;
    @Input() public venue: Location;
    timesVisited$: Observable<number>
    registeredVisitsLength: number;
    // visits$: Observable<any>

    public config: Options;

    constructor(
        public authService: AuthService,
        public router: Router,
        public adminService: AdminService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.adminService.getRegisterdVisits(this.venue.id, this.mochucoObject.id)
            .subscribe((registeredVisits: any) => {
                this.registeredVisitsLength = registeredVisits.length
            })
    }

    onDownloadQrcode(): void {
        this.dialog.open(DownloadQrComponent,
            {
                data:
                {
                    objectId: this.mochucoObject.id,
                    venueId: this.venue.id,
                    objectName: this.mochucoObject.nameNl,
                    venueName: this.venue.nameNl
                }
            });
    }

    onDeleteObject() {
        if (window.confirm('are you sure')) {
            // console.log(objectId);
            this.adminService.deleteObject(this.venue.id, this.mochucoObject.id)
                .then(res => {
                    console.log('object deleted');
                })
                .catch(err => console.log(err))
                .then(res => {
                    this.adminService.deleteObjectScore(this.venue.id, this.mochucoObject.id)
                })
                .catch(err => console.log(err))
                .then(res => {
                    console.log('objectScore deleted')
                })
                .catch(err => console.log(err))
                .then(res => {
                    this.adminService.deleteObjectLikes(this.venue.id, this.mochucoObject.id)
                })
                .catch(err => console.log(err))
                .then(res => {
                    console.log('objectLikes deleted')
                    this.router.navigate(['admin/admin-venue', { id: this.venue.id }])
                })
                .catch(err => console.log(err));
        } else {
            alert('nothing deleted');
        }
    }
    onEditObject(mochucoObjectId) {
        this.router.navigate(['admin/admin-object', {
            venueId: this.venue.id,
            objectId: this.mochucoObject.id,
            venueName: this.venue.nameNl
        }])
    }

    onTimesVisited() {
        this.router.navigate([
            '/admin/visits',
            {
                mochucoObjectId: this.mochucoObject.id,
                venueId: this.venue.id
            }])
    }
}

