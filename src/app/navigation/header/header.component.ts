import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Object, ObjectService } from '../../pages/object/object.service';
import { Observable } from 'rxjs';
import { ScannerService } from '../../pages/scanner/scanner.service';
import { UiService } from '../../shared/ui.service';
import { MatDialog } from '@angular/material/dialog';

import { MochucoComponent } from '../../pages/mochuco/mochuco.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  // objectName: string;
  objectData$: Observable<any>
  object: Object;
  object$: Observable<Object>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public objectService: ObjectService,
    private scannerServcive: ScannerService,
    public uiService: UiService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

  }

  onLogo() {
    this.dialog.open(MochucoComponent, {
      maxHeight: '80vh'
    })
  }
  onVenue() {
    this.router.navigateByUrl('venue');

  }
}
