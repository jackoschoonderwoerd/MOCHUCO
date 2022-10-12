import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from '../object/object.service';
import { ScannerService } from './scanner.service';
import { UiService } from '../../shared/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { UiDialogComponent } from '../../shared/ui-dialog/ui-dialog.component';

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {


    @ViewChild('scanner') scanner: ElementRef<HTMLElement>
    @ViewChild('cameraButton') cameraButton: ElementRef<HTMLElement>
    title = 'Mochuco';
    output!: string;
    isInApp: boolean = false;

    requestedVenueId: string;
    requestedObjectId: string;

    constructor(
        private router: Router,
        private objectService: ObjectService,
        private route: ActivatedRoute,
        private scannerService: ScannerService,
        private uiService: UiService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.scannerService.setIsScanning(true);
        // this.cameraButton.nativeElement.click();
        document.getElementById("cameraButton").click();

        const venue = window.location.href
        const headRemoved = venue.split('//')[1]
        const headAndTailRemoved = headRemoved.split('/')[0]

    }


    onError(e: any): void {
        alert(e);
    }
    onData(event: string) {
        if (event) {
            // alert(event);
            // this.router.navigateByUrl('event');

            localStorage.setItem('last-visited', JSON.stringify(event))
            if (event.indexOf('mochuco') === -1) {
                alert('this is not a mochuco url');
                return;
            }
            console.log('mochuco FOUND')
            this.uiService.isLoadingSubject.next(true);
            const queryparamsStart = event.split('?')[1]
            const queryparamsArray = queryparamsStart.split('&')
            const objectId = queryparamsArray[1].split('=')[1];
            const venueId = queryparamsArray[2].split('=')[1];
            console.log(objectId, venueId)
            this.scannerService.isInApp$.subscribe((isInApp: boolean) => {
                if (!isInApp) {
                    // if (confirm(`Is in app? : ${isInApp}.`)) {
                    var open = window.open(event); // => to app component
                    if (open == null || typeof (open) == 'undefined') {

                        alert(`
                                "Turn off your pop-up blocker!\n\n
                                Settins => Safari => Block Pop-ups`)
                    }
                    return;
                    // }
                } else {
                    // if (confirm(`Is in app? : ${isInApp}.`)) {
                    this.objectService.setObject(venueId, objectId, 'scanner component');
                    this.objectService.setVenue(venueId);
                    this.objectService.refreshObject(objectId);
                    this.objectService.setObjectByLanguage(venueId, objectId)
                    // }
                }
            })
            this.scannerService.setIsScanning(false);
        }
    }

    ngOnDestroy(): void {
        this.scannerService.setIsScanning(false);
    }
}
