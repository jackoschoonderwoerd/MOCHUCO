
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
        this.venueIdSubject.next(venueId)
        // console.log('object.service 106 setVenue(){}', venueId)
        const venueRef = doc(this.fs, `venues/${venueId}`)
        docData(venueRef, { idField: 'id' }).subscribe((venue: Venue) => {
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
    // increaseTimesVisited(venueId: string, objectId: string) {
    //     this.getTimesVisitedId(venueId, objectId).subscribe((data: any) => {
    //         console.log(data)
    //         let visited = data.visited
    //         const newVisited = visited + 1
    //         // INCREASE VISITED
    //         this.timesVisitedSubject.next(newVisited);
    //         this.registerVisit(venueId, objectId)
    //             .then(res => console.log('visit registerd'))
    //             .catch(err => console.log('visit NOT registered', err));
    // const scoreRef = doc(this.fs, `/venues/${venueId}/score/${objectId}`);
    // const myObject = { visited: newVisited }
    // updateDoc(scoreRef, myObject)
    //     .then(res => {
    //         console.log(res);
    //         this.registerVisit(venueId, objectId)
    //             .then(res => console.log('visit registered'))
    //             .catch(err => console.log('visit registration failed', err));
    //     })
    //     .catch(err => console.log(err))
    //     })
    // }

    // registerVisit(venueId, objectId) {
    //     const registerObject = {
    //         timestamp: new Date()
    //     }
    //     const registerRef = collection(this.fs, `venues/${venueId}/objects/${objectId}/visits`);
    //     return addDoc(registerRef, registerObject)
    // }

    // getTimesVisitedId(venueId, objectId) {
    //     console.log(venueId, objectId)
    //     const scoreRef = doc(this.fs, `/venues/${venueId}/score/${objectId}`);
    //     return docSnapshots(scoreRef)
    //         .pipe(
    //             take(1),
    //             map(data => {
    //                 const id = data.id
    //                 const docData = data.data()
    //                 return ({ ...docData, id })
    //             })
    //         )
    // }




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
