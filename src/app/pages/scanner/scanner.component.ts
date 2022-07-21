import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from '../object/object.service';

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {


    @ViewChild('scanner') scanner: ElementRef<HTMLElement>
    title = 'qr_code_scanner';
    output!: string;
    isInApp: boolean = false;

    requestedVenueId: string;
    requestedObjectId: string;

    constructor(
        private router: Router,
        private objectService: ObjectService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log('scanner component location 1: ', window.location.href)
        const location = window.location.href
        const headRemoved = location.split('//')[1]
        const headAndTailRemoved = headRemoved.split('/')[0]
        console.log('head and tail removed', headAndTailRemoved);

        if (headAndTailRemoved === 'mochuco-a185b.web.app') {
            // if (headAndTailRemoved === 'localhost:4200') {
            this.isInApp = true
        }
    }

    onError(e: any): void {
        alert(e);
    }
    onData(event: string) {

        // window.open(event);


        const queryparamsStart = event.split('?')[1]
        const queryparamsArray = queryparamsStart.split('&')

        const objectId = queryparamsArray[0].split('=')[1];
        const venueId = queryparamsArray[1].split('=')[1];
        this.objectService.setObject(venueId, objectId);


        if (this.isInApp) {
            alert(window.location.href);
            this.router.navigate(
                ['object'],
                {
                    queryParams: {
                        objectId: objectId,
                        venueId: venueId
                    }
                })
            this.objectService.setObjectIdObservable(objectId);
        } else {
            console.log('scanner component 58 event: ', event)
            window.open(event);
        }
    }


    triggerFalseClick() {
        console.log('clicking')
        let el: HTMLElement = this.scanner.nativeElement;
        el.click();
    }
}
