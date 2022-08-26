import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venue } from 'src/app/admin/admin.service';
import { MochucoObject } from '../../../../pages/object/object.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Options } from 'ngx-qrcode-styling';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../../../../pages/test/test.component';


@Component({
    selector: 'app-admin-objects-list-item',
    templateUrl: './admin-objects-list-item.component.html',
    styleUrls: ['./admin-objects-list-item.component.scss']
})
export class AdminObjectsListItemComponent implements OnInit {


    @Input() public mochucoObject: MochucoObject;
    @Input() public venue: Venue;
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

        // console.log(this.mochucoObject.nameNl)

        // this.config = {
        //     width: 200,
        //     height: 200,
        //     data: `https://mochuco-a185b.web.app/?site=mochuco&objectId=${this.mochucoObject.id}&venueId=${this.venue.id}`,
        //     image: './../assets/Logo/2021-0705_Mochuco_-_Logo_zwart_wit_1000px.png',
        //     margin: 5,
        //     dotsOptions: {
        //         color: "#000000",
        //         type: "square"
        //     },
        //     backgroundOptions: {
        //         color: "#ffffff",
        //     },
        //     imageOptions: {
        //         crossOrigin: "anonymous",
        //         margin: 0
        //     }
        // };
        // console.log(this.config.data)

        this.adminService.getRegisterdVisits(this.venue.id, this.mochucoObject.id)
            .subscribe((registeredVisits: any) => {
                this.registeredVisitsLength = registeredVisits.length
            })
    }

    onDownloadQrcode(): void {
        // this.dialog.open(TestComponent)
        console.log('download qr-code');
        let DATA: any = document.getElementById(this.mochucoObject.id);
        console.log(DATA)
        html2canvas(DATA).then((canvas) => {
            console.log(canvas)
            let fileWidth = 210;
            // let fileHeight = 210;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');

            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('angular-demo.pdf');
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

