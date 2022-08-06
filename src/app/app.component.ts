import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from './pages/object/object.service';
import { ScannerService } from './pages/scanner/scanner.service';
import { SwUpdate } from '@angular/service-worker';
import { MochucoComponent } from './pages/mochuco/mochuco.component';
import { TestComponent } from './pages/test/test.component';

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
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    console.log(this.route.snapshot.queryParamMap);
    this.route.queryParamMap.subscribe((queryParamMap: any) => {
      console.log(queryParamMap.params);
      if (queryParamMap.params.venueId && queryParamMap.params.objectId) {
        console.log('queryParamMap.params.venueId && queryParamMap.params.objectId FOUND')
        const venueId = queryParamMap.params.venueId;
        console.log('app.component 30 venueId: ', venueId);
        const objectId = queryParamMap.params.objectId;
        console.log('app.component 32 objectId: ', objectId);
        this.objectService.setVenue(venueId)
        this.objectService.setObject(venueId, objectId, 'appComponent')
        this.objectService.setVenueObjects(venueId);
        this.scannerService.setIsInApp(true);
      }
    });
    // this.dialog.open(MochucoComponent, {
    //   maxHeight: '80vh'
    // })
    // this.dialog.open(TestComponent)
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }
  }
}

