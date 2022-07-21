import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectService } from './object.service';

@Component({
    selector: 'app-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {



    objectId: string;
    venueId: string;
    objectData$: Observable<string>

    object_001Count: number;
    object_002Count: number;
    object_003Count: number

    constructor(
        private route: ActivatedRoute,
        private objectService: ObjectService
    ) { }

    ngOnInit(): void {
        this.objectId = this.route.snapshot.queryParamMap.get('objectId')
        this.objectService.setObjectIdObservable(this.objectId)

        this.venueId = this.route.snapshot.queryParamMap.get('venueId')
        this.objectService.setVenueIdObservable(this.venueId)

        this.objectData$ = this.objectService.getObject(this.venueId, this.objectId)

    }

}
