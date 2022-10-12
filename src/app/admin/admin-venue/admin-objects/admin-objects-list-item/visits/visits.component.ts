import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService, Location } from '../../../../admin.service';
import { MochucoObject } from '../../../../../pages/object/object.service';

@Component({
    selector: 'app-visits',
    templateUrl: './visits.component.html',
    styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

    private venueId: string;
    private mochucoObjectId: string;
    public visits$: Observable<any>;
    public venue$: Observable<Location>
    public mochucoObject$: Observable<MochucoObject>

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.venueId = this.route.snapshot.paramMap.get('venueId');
        this.mochucoObjectId = this.route.snapshot.paramMap.get('mochucoObjectId');
        this.venue$ = this.adminService.getVenueObservable(this.venueId);
        this.mochucoObject$ = this.adminService.getObjectObservable(this.venueId, this.mochucoObjectId);
        this.visits$ = this.adminService.getRegisterdVisits(this.venueId, this.mochucoObjectId);
    }

    onDeleteVisit(visitId: string) {
        if (confirm('this will permanently delete the selected entry')) {
            console.log(visitId);
            this.adminService.deleteRegisteredVisit(this.venueId, this.mochucoObjectId, visitId);
        }
        return
    }

    onBackToObject() {
        this.router.navigate([
            '/admin/admin-objects',
            {
                venueId: this.venueId,

            }
        ])
    }
}
