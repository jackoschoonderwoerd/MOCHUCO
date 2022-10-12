
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable, take } from 'rxjs';
import { UiService } from '../../shared/ui.service';
import { Router } from '@angular/router';

import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    collectionGroup,
    doc,
    docData,
    deleteDoc,
    updateDoc,
    DocumentReference,
    setDoc,
    orderBy,
    query,
    getDoc,
    docSnapshots,
    where,
    collectionSnapshots,
} from '@angular/fire/firestore';

import { Location } from 'src/app/admin/admin.service';
import { ImageUploadData } from '../../admin/admin-venue/admin-objects/admin-object/admin-object.service';
import { AdminService } from '../../admin/admin.service';
import { getLocaleDateFormat } from '@angular/common';
// import { SelectLanguageService } from '../../navigation/footer/select-language/select-language.service';
import { LanguageData } from 'src/app/shared/models';

export interface MochucoAudio {
    audioNL?: File,
    audioEn?: File,
    audioFr?: File
}

export interface MochucoObject {
    id?: string
    nameNl: string;
    nameEn: string;
    contentNl: string;
    contentEn: string;
    objectUrl?: string;
    objectUrlDev?: string;
    imageUrl?: string
    imageUploadData?: ImageUploadData;
    timesVisitedId?: string;
    audio?: MochucoAudio


}


@Injectable({
    providedIn: 'root'
})


export class ObjectService {

    object: MochucoObject = {
        nameNl: '',
        nameEn: '',
        contentNl: '',
        contentEn: '',
        objectUrl: '',
        objectUrlDev: '',
        imageUrl: '',
        imageUploadData: {
            imageUrl: '',
            imageStoragePath: ''
        },
        timesVisitedId: ''
    }
    venue: Location = {
        nameNl: '',
        nameEn: '',
        contentNl: '',
        contentEn: '',
        objects: []
    }




    private timesVisitedSubject = new BehaviorSubject<number>(0);
    timesVisited$ = this.timesVisitedSubject.asObservable()

    private objectSubject = new BehaviorSubject<MochucoObject>(this.object);
    object$ = this.objectSubject.asObservable();

    private objectIdSubject = new BehaviorSubject<string>('');
    objectId$ = this.objectIdSubject.asObservable();

    private objectContentByLanguageSubject = new BehaviorSubject<string>(null);
    public objectContentByLanguage$ = this.objectContentByLanguageSubject.asObservable();

    private objectNameByLanguageSubject = new BehaviorSubject<string>(null)
    public objectNameByLanguage$ = this.objectNameByLanguageSubject.asObservable()

    // private objectNameSubject = new BehaviorSubject<string>('');
    // objectId$ = this.objectNameSubject.asObservable();

    private venueIdSubject = new BehaviorSubject<string>('');
    venueId$ = this.venueIdSubject.asObservable();

    private venueSubject = new BehaviorSubject<Location>(this.venue)
    venue$ = this.venueSubject.asObservable();

    // private timesVisitedSubject = new BehaviorSubject<number>(0)



    constructor(
        private fs: Firestore,
        private uiService: UiService,
        private router: Router,
        private adminService: AdminService,
        // private selectLanguageService: SelectLanguageService
    ) { }

    getObjectObservable(venueId: string, objectId: string) {
        console.log('getting object observable')
        // this.uiService.setIsLoading(true);

        // INCREASE COUNTER


        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`)
        return docData(objectRef) as Observable<any>;
    }

    setVenue(venueId) {
        console.log(venueId);
        if (venueId) {
            this.venueIdSubject.next(venueId)
            // console.log('object.service 106 setVenue(){}', venueId)
            const venueRef = doc(this.fs, `venues/${venueId}`)
            docData(venueRef, { idField: 'id' }).subscribe((venue: Location) => {
                // console.log(venue);
                this.venue = venue;
                this.venueSubject.next(venue);
            })
        } else {
            console.log('remove venue name')
            const venue: Location = {
                nameNl: '',
                contentNl: ''
            }
            this.venueSubject.next(venue);
        }
    }


    setVenueObjects(venueId: string) {
        const venueRef = collection(this.fs, `venues/${venueId}/objects`);
        collectionData(venueRef, { idField: 'id' }).subscribe((venueObjects: MochucoObject[]) => {
            this.venue.objects = venueObjects
        })
    }

    setObject(venueId: string, objectId: string, source: string) {
        this.objectIdSubject.next(objectId);
        // console.log('service 69: setObject()', venueId, objectId, source);
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`);
        docData(objectRef).subscribe((object: MochucoObject) => {
            this.object = object;
            console.log(object)
            this.objectSubject.next(object)
            this.router.navigateByUrl('object');
            this.uiService.setIsLoading(false);
            this.adminService.registerVisit(venueId, objectId)
            // this.getTimesVisited(objectId)/
        })
    }

    setObjectByLanguage(venueId: string, objectId: string) {
        // this.selectLanguageService.selectedLanguage$.subscribe((language: string) => {
        // console.log(language.abb);
        // const contentByLanguage = this.abbToContent(language.abb);
        // const nameByLanguage = this.abbToName(language.abb)
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`);
        docData(objectRef).subscribe((object: MochucoObject) => {
            this.object = object;

            // console.log(contentByLanguage)
            // console.log(object[contentByLanguage])
            this.objectSubject.next(object)
            // this.objectContentByLanguageSubject.next(object[contentByLanguage]);
            // this.objectNameByLanguageSubject.next(object[nameByLanguage])
            this.router.navigateByUrl('object');
            this.uiService.setIsLoading(false);
            this.adminService.registerVisit(venueId, objectId)

        })
        // })
    }

    refreshObject(objectId) {
        // console.log(this.venue, objectId)
        const index = this.venue.objects.findIndex((object: MochucoObject) => {
            return object.id === objectId
        });

        // const object: Object = this.venue.objects[index]
        const object: any = this.venue.objects[index]
        // console.log(object);
        this.objectSubject.next(object);
        this.uiService.setIsLoading(false);
        this.router.navigateByUrl('object');

    }
    private abbToContent(abb) {
        const firstLetter = abb.charAt(0);
        const remainingLetters = abb.substring(1)
        const firstLetterCap = firstLetter.toUpperCase()
        const result = 'content' + firstLetterCap + remainingLetters;
        console.log(result);
        return result
    }
    private abbToName(abb) {
        const firstLetter = abb.charAt(0);
        const remainingLetters = abb.substring(1)
        const firstLetterCap = firstLetter.toUpperCase()
        const result = 'name' + firstLetterCap + remainingLetters;
        console.log(result);
        return result
    }
}
