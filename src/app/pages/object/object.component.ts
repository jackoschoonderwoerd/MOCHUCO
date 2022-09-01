import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectService } from './object.service';
import { UiService } from '../../shared/ui.service';
import { AdminService } from '../../admin/admin.service';
import { AuthService } from '../../admin/auth/auth.service';
import { AdminObjectAudioService, AudioUrlData } from '../../admin/admin-venue/admin-objects/admin-object/admin-object-audio/admin-object-audio.service';

@Component({
    selector: 'app-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {


    visited: number = 0;
    likes: number = 0;
    venueId: string;
    objectId: string;
    likeButtonDisabled: boolean = true
    dutchAudioUrl$: Observable<string>
    englishAudioUrl$: Observable<string>;
    englishAudioUrl: string;
    audioUrlsData: AudioUrlData[];
    language: string;

    // object$: Observable<Object>;

    // @ViewChild('img').addeve

    constructor(
        private route: ActivatedRoute,
        public objectService: ObjectService,
        public uiService: UiService,
        private router: Router,
        private adminService: AdminService,
        public authService: AuthService,
        public adminObjectAudioService: AdminObjectAudioService,
    ) {

    }

    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe(status => console.log(status));
        this.uiService.setIsLoadingImage(true);
        this.objectService.venueId$.subscribe((venueId: string) => {
            console.log(venueId)
            this.venueId = venueId
            this.objectService.objectId$.subscribe((objectId: string) => {
                console.log(objectId)
                this.objectId = objectId
                // this.adminService.getTimesVisited(venueId, objectId).subscribe((timesVisitedData: any) => {
                //     console.log(timesVisitedData)
                //     this.visited = timesVisitedData.visited;
                // })
                this.adminService.getLikes(venueId, objectId).subscribe((likesData: any) => {
                    console.log(likesData);
                    this.likes = likesData.likes
                })
            });
        });
        this.uiService.selectedLanguage$.subscribe((language: string) => {
            console.log(language);
            this.language = language;
        })
        // this.adminObjectAudioService.getDutchAudio(this.venueId, this.objectId)
        // this.dutchAudioUrl$ = this.adminObjectAudioService.getDutchAudio(this.venueId, this.objectId);
        // this.englishAudioUrl$ = this.adminObjectAudioService.getEnglishAudio(this.venueId, this.objectId);
        this.adminObjectAudioService.getAudioCollection(this.venueId, this.objectId)
            .subscribe((audioUrlsData: AudioUrlData[]) => {
                console.log(audioUrlsData)
                this.audioUrlsData = audioUrlsData
            })

    }

    // redirect() {
    //     this.router.navigateByUrl('mochuco')
    // }
    imageLoad() {
        this.uiService.setIsLoadingImage(false)
        console.log('imageLoad()')
    }
    loadingObject() {
        // console.log('object present');
        this.uiService.setIsLoading(true);
    }
    notLoadingObject() {
        console.log('no object present');
        this.router.navigateByUrl('mochuco')
    }
    onLike() {
        this.adminService.getLikes(this.venueId, this.objectId)
            .subscribe((likesData: any) => {
                console.log(likesData)
                likesData.likes += 1
                this.likes += 1;
                console.log(likesData)
                this.adminService.updateLikes(this.venueId, this.objectId, likesData)
                this.likeButtonDisabled = false;

            })
        // this.adminService.addLike(this.objectId, this.venueId)

    }

}
