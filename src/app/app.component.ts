import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'qr_code_scanner';
    output!: string;

    constructor(
        private router: Router
    ) { }

    onError(e: any): void {
        alert(e);
    }
    onData(e: any) {
        console.log(e)
        // this.router.navigateByUrl(e);
        window.open(e, "_blank")
    }
}
