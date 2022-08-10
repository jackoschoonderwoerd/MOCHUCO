
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    query
} from '@angular/fire/firestore';
import { Venue } from 'src/app/admin/admin.service';

export interface MochucoObject {
    id?: string
    nameNl: string;
    nameEn: string;
    contentNl: string;
    contentEn: string;
    objectUrl?: string;
    objectUrlDev?: string;
    imageUrl?: string

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
        imageUrl: ''
    }
    venue: Venue = {
        nameNl: '',
        nameEn: '',
        contentNl: '',
        contentEn: '',
        objects: []
    }




    private objectSubject = new BehaviorSubject<MochucoObject>(this.object)
    object$ = this.objectSubject.asObservable()

    private objectNameSubject = new BehaviorSubject<string>('');
    objectId$ = this.objectNameSubject.asObservable();

    private venueIdSubject = new BehaviorSubject<string>('')
    venueId$ = this.venueIdSubject.asObservable();

    private venueSubject = new BehaviorSubject<Venue>(this.venue)
    venue$ = this.venueSubject.asObservable();



    constructor(
        private fs: Firestore,
        private uiService: UiService,
        private router: Router) { }

    getObjectObservable(venueId: string, objectId: string) {
        // this.uiService.setIsLoading(true);
        // console.log('objectService 55: ', venueId, objectId)
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`)
        return docData(objectRef) as Observable<any>;
    }

    setVenue(venueId) {
        // console.log('object.service 106 setVenue(){}', venueId)
        const venueRef = doc(this.fs, `venues/${venueId}`)
        docData(venueRef).subscribe((venue: Venue) => {
            // console.log(venue);
            this.venue = venue;
            this.venueSubject.next(venue);
        })
    }


    setVenueObjects(venueId: string) {
        // console.log('objectService 98', venueId)
        const venueRef = collection(this.fs, `venues/${venueId}/objects`);
        collectionData(venueRef, { idField: 'id' }).subscribe((venueObjects: MochucoObject[]) => {
            this.venue.objects = venueObjects
            // console.log(this.venue)
        })
    }

    setObject(venueId: string, objectId: string, source: string) {
        // console.log('service 69: setObject()', venueId, objectId, source);
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`);
        docData(objectRef).subscribe((object: MochucoObject) => {
            this.object = object;
            // console.log('objectService 73', object);
            this.object = object;
            this.objectSubject.next(object)
            this.uiService.setIsLoading(false);
            this.router.navigateByUrl('object');
            this.uiService.setIsLoading(false);
        })
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

}
