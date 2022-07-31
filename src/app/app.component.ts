import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from './pages/object/object.service';
import { ScannerService } from './pages/scanner/scanner.service';

import { MochucoComponent } from './pages/mochuco/mochuco.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mochuco';
  output!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private objectService: ObjectService,
    private scannerService: ScannerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParamMap: any) => {
      if (queryParamMap.params.venueId && queryParamMap.params.objectId) {
        const venueId = queryParamMap.params.venueId;
        const objectId = queryParamMap.params.objectId;
        this.objectService.setVenue(venueId)
        this.objectService.setObject(venueId, objectId, 'appComponent')
        this.objectService.setVenueObjects(venueId);
        this.scannerService.setIsInApp(true);
      }
    });
    // this.dialog.open(MochucoComponent, {
    //   maxHeight: '80vh'
    // })
  }
}
