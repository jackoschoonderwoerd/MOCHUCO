
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

export interface Object {
    id?: string
    name: string,
    htmlContent: string
}

@Injectable({
    providedIn: 'root'
})

// export interface Venue {
//   name: string
//   objects: Object[]
// }

export class ObjectService {

    object: Object = {
        name: '',
        htmlContent: ''
    }


    private objectDataSubject = new BehaviorSubject<Object>(this.object)
    objectData$ = this.objectDataSubject.asObservable()

    private objectNameSubject = new BehaviorSubject<string>('');
    objectId$ = this.objectNameSubject.asObservable();

    private venueIdSubject = new BehaviorSubject<string>('')
    venueId$ = this.venueIdSubject.asObservable()

    constructor(private fs: Firestore) { }

    getObject(venueId: string, objectId: string) {
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`)
        return docData(objectRef) as Observable<any>;
    }
    setObjectIdObservable(objectId) {
        this.objectNameSubject.next(objectId);
    };
    setVenueIdObservable(venueId) {
        this.venueIdSubject.next(venueId);
    };
    // setObjectDataObservable(venueId: string, objectId: string) {
    //     const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`)
    //     this.objectDataSubject.next(docData(objectRef))
    // }
    setObject(venueId: string, objectId: string) {
        const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`);
        docData(objectRef).subscribe((object: Object) => {
            this.object = object;
            console.log(this.object);
            this.objectDataSubject.next(object)
        })

    }
}
