import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectService } from './object.service';
import { UiService } from '../../shared/ui.service';

@Component({
    selector: 'app-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

    object: Object
    // object$: Observable<Object>;

    // @ViewChild('img').addeve

    constructor(
        private route: ActivatedRoute,
        public objectService: ObjectService,
        public uiService: UiService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.uiService.setIsLoadingImage(true)


    }

    redirect() {
        this.router.navigateByUrl('mochuco')
        // console.log('redirecting')
        // const lastVisited = JSON.parse(localStorage.getItem('last-visited'))
        // console.log(lastVisited)
        // window.open(lastVisited)
    }
    imageLoad() {
        this.uiService.setIsLoadingImage(false)
        console.log('imageLoad()')
    }
    loadingObject() {
        console.log('object present');
        this.uiService.setIsLoading(true);
    }
    notLoadingObject() {
        console.log('no object present');
        this.router.navigateByUrl('mochuco')
    }
}
