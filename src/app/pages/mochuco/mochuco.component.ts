import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UiService } from '../../shared/ui.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-mochuco',
    templateUrl: './mochuco.component.html',
    styleUrls: ['./mochuco.component.scss']
})
export class MochucoComponent implements OnInit {

    isLoading$: Observable<boolean>
    isLoading: boolean = false;

    constructor(
        public uiService: UiService,
        // private dialogRef: MatDialogRef<MochucoComponent>,
        // private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.uiService.isLoading$
        this.uiService.isLoading$.subscribe((status: boolean) => {
            console.log(status)
            this.isLoading = status;
        })
    }
    closeDialog() {
        // this.dialogRef.close();
        // this.dialog.closeAll();
    }

}
