import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectService } from '../../pages/object/object.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    objectTitle: string;
    objectData$: Observable<any>

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public objectService: ObjectService
    ) { }

    ngOnInit(): void {
        // this.objectService.objectData$.subscribe((objectData: any) => {
        //     this.objectTitle = objectData.objectTitle
        // })

    }
    onLogo() {
        this.router.navigateByUrl('home');
    }
}
