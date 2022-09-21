
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

import { Venue } from 'src/app/admin/admin.service';
import { ImageUploadData } from '../../admin/admin-venue/admin-objects/admin-object/admin-object.service';
import { AdminService } from '../../admin/admin.service';
import { getLocaleDateFormat } from '@angular/common';

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
    venue: Venue = {
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
    objectId$ = this.objectIdSubject.asObservable()

    // private objectNameSubject = new BehaviorSubject<string>('');
    // objectId$ = this.objectNameSubject.asObservable();

    private venueIdSubject = new BehaviorSubject<string>('');
    venueId$ = this.venueIdSubject.asObservable();

    private venueSubject = new BehaviorSubject<Venue>(this.venue)
    venue$ = this.venueSubject.asObservable();

    // private timesVisitedSubject = new BehaviorSubject<number>(0)



    constructor(
        private fs: Firestore,
        private uiService: UiService,
        private router: Router,
        private adminService: AdminService) { }

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
            docData(venueRef, { idField: 'id' }).subscribe((venue: Venue) => {
                // console.log(venue);
                this.venue = venue;
                this.venueSubject.next(venue);
            })
        } else {
            console.log('remove venue name')
            const venue: Venue = {
                nameNl: '',
                contentNl: ''
            }
            this.venueSubject.next(venue);
        }
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
