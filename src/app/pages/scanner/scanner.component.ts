import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from '../object/object.service';
import { ScannerService } from './scanner.service';
import { UiService } from '../../shared/ui.service';

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
    ) { }

    ngOnInit(): void {

        this.scannerService.setIsScanning(true);
        // this.cameraButton.nativeElement.click();
        document.getElementById("cameraButton").click();

        const location = window.location.href
        const headRemoved = location.split('//')[1]
        const headAndTailRemoved = headRemoved.split('/')[0]
        this.toggleCamera()



        // if (headAndTailRemoved === 'localhost:4200') {
        //     this.isInApp = true;
        //     this.scannerService.setIsInApp(true)
        // }

    }

    toggleCamera() {

    }

    onError(e: any): void {
        alert(e);
    }
    onData(event: string) {
        // this.uiService.setIsLoading(true);
        if (event) {
            console.log('scanner, onData(){} event: ', event)
            localStorage.setItem('last-visited', JSON.stringify(event))
            if (event.indexOf('mochuco') === -1) {
                alert('this is not a mochuco url');
                // window.open(event);
                return;
            }
            console.log('mochuco FOUND')
            this.uiService.isLoadingSubject.next(true);
            const queryparamsStart = event.split('?')[1]
            console.log(queryparamsStart);
            const queryparamsArray = queryparamsStart.split('&')
            console.log(queryparamsArray);
            const objectId = queryparamsArray[1].split('=')[1];
            const venueId = queryparamsArray[2].split('=')[1];
            console.log(objectId, venueId)
            // this.objectService.setVenue(venueId)
            this.scannerService.isInApp$.subscribe((isInApp: boolean) => {
                if (!isInApp) {
                    window.open(event); // => to app component
                    return;
                } else {
                    this.objectService.setObject(venueId, objectId, 'scanner component');
                    // this.objectService.setObject(objectId)
                    this.objectService.refreshObject(objectId);
                }
            })
            this.scannerService.setIsScanning(false);
        }
    }

    ngOnDestroy(): void {
        this.scannerService.setIsScanning(false);
    }
}
