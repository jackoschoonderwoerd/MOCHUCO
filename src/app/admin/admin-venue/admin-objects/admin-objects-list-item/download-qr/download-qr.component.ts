import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-download-qr',
    templateUrl: './download-qr.component.html',
    styleUrls: ['./download-qr.component.scss']
})
export class DownloadQrComponent implements OnInit {

    objectId: string;
    objectName: string;
    venueId: string;
    venueName: string;
    selectedSize: number = 500;
    @ViewChild('printArea') private printArea: ElementRef

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<DownloadQrComponent>
    ) { }

    ngOnInit(): void {
        console.log(this.data)
        this.objectId = this.data.objectId;
        this.objectName = this.data.objectName;
        this.venueId = this.data.venueId;
        this.venueName = this.data.venueName
    }
    onDownloadQrCode() {
        console.log(this.printArea.nativeElement)
        let DATA: any = this.printArea.nativeElement;
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 210;
            // let fileHeight = 210;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');

            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('angular-demo.pdf');
        });

    }
    onCloseDialog() {
        this.dialogRef.close()
    }

}
