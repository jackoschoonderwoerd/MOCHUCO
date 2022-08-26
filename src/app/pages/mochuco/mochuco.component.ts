import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UiService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mochuco',
    templateUrl: './mochuco.component.html',
    styleUrls: ['./mochuco.component.scss']
})
export class MochucoComponent implements OnInit {


    constructor(
        public uiService: UiService,
        private router: Router
        // private dialogRef: MatDialogRef<MochucoComponent>,
        // private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        // this.isLoading$ = this.uiService.isLoading$
        // this.uiService.isLoading$.subscribe((status: boolean) => {
        //     console.log(status)
        //     this.isLoading = status;
        // })
    }
    onAdminOnly() {
        this.router.navigateByUrl('/admin')
    }

}
