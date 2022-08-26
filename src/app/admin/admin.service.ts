import { Injectable } from '@angular/core';
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
import { Observable, take, map } from 'rxjs';
import { Router } from '@angular/router';
import { MochucoObject } from './../pages/object/object.service'

export interface Venue {
    nameNl: string;
    contentNl: string;
    nameEn: string;
    contentEn: string;
    id?: string;
    objects?: Object[]
}

@Injectable({
    providedIn: 'root'
})


export class AdminService {

    constructor(
        private firestore: Firestore,
        private router: Router
    ) { }

    getVenues() {
        const venuesRef = collection(this.firestore, 'venues')
        return collectionData(venuesRef, { idField: 'id' }) as Observable<Venue[]>
    }

    getVenue(id) {
        console.log(id)
        const venueRef = doc(this.firestore, `venues/${id}`)
        return docData(venueRef, { idField: 'id' });
    }
    getVenueObservable(venueId) {
        const venueRef = doc(this.firestore, `venues/${venueId}`)
        return docData(venueRef, { idField: 'id' }) as Observable<Venue>;
    }

    addVenue(venue: Venue) {
        console.log(venue);
        const venueRef = collection(this.firestore, 'venues')
        return addDoc(venueRef, venue)
    }
    updateVenue(venue: Venue) {
        const venueRef = doc(this.firestore, `venues/${venue.id}`);
        return setDoc(venueRef, venue);
    }
    deleteVenue(id: string) {
        const venueRef = doc(this.firestore, `venues/${id}`);
        return deleteDoc(venueRef)
    }
    addObject(venueId: string, object: MochucoObject) {
        console.log(venueId, object);
        const objectRef = collection(this.firestore, `venues/${venueId}/objects`);
        return addDoc(objectRef, object)
    }



    getObjects(venueId: string) {
        const objectsRef = collection(this.firestore, `venues/${venueId}/objects`);
        const objectsByNameNl = query(objectsRef, orderBy('nameNl'))
        return collectionData(objectsByNameNl, { idField: 'id' }) as Observable<MochucoObject[]>
        // return collectionData(objectsRef, { idField: 'id' })
    }
    getObject(venueId, objectId) {
        const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
        return docData(objectRef)
    }

    getObjectObservable(venueId, objectId) {
        const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
        return docData(objectRef) as Observable<MochucoObject>
    }
    // getObjectTimesVisitedId(venueId, objectId) {
    //     console.log(venueId, objectId)
    //     const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
    //     return docData(objectRef);
    // }

    updateObject(venueId: string, object: MochucoObject) {
        console.log(venueId, object)
        const objectRef = doc(this.firestore, `venues/${venueId}/objects/${object.id}`);
        return setDoc(objectRef, object);
    }
    deleteObject(venueId: string, objectId: string) {
        const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
        return deleteDoc(objectRef)
    }

    addTimesVisitedZero(venueId: string, objectId: string) {
        const scoreZeroObject = { visited: 0 }
        const zeroScoreRef = doc(this.firestore, `venues/${venueId}/score/${objectId}`)
        return setDoc(zeroScoreRef, scoreZeroObject);
    }
    getTimesVisited(venueId: string, objectId: string) {
        console.log(venueId, objectId)
        const scoreRef = doc(this.firestore, `venues/${venueId}/score/${objectId}`);
        return docData(scoreRef)
    }
    deleteObjectScore(venueId: string, objectId: string) {
        const scoreRef = doc(this.firestore, `venues/${venueId}/score/${objectId}`);
        return deleteDoc(scoreRef)
    }

    addLikesZero(venueId: string, objectId: string) {
        const likesZeroObject = { likes: 0 };
        const likesZeroRef = doc(this.firestore, `venues/${venueId}/likes/${objectId}`);
        return setDoc(likesZeroRef, likesZeroObject);
    }
    deleteObjectLikes(venueId: string, objectId: string) {
        const likesRef = doc(this.firestore, `venues/${venueId}/likes/${objectId}`)
        return deleteDoc(likesRef)
    }
    getLikes(venueId: string, objectId: string) {
        const likesRef = doc(this.firestore, `venues/${venueId}/likes/${objectId}`);
        return docData(likesRef)
            .pipe(
                take(1),
                map((data: any) => {
                    console.log(data.likes)
                    return data
                })
            )
    }
    updateLikes(venueId: string, objectId: string, likesData: any) {
        console.log(venueId, objectId, likesData)
        const likesRef = doc(this.firestore, `venues/${venueId}/likes/${objectId}`);
        return setDoc(likesRef, likesData);
    }
    registerVisit(venueId, objectId) {
        const registerObject = {
            timestamp: new Date().getTime()
        }
        console.log(registerObject);
        const registerRef = collection(this.firestore, `venues/${venueId}/objects/${objectId}/visits`);
        return addDoc(registerRef, registerObject)
    }
    getRegisterdVisits(venueId, objectId) {
        const registeredVisitsRef = collection(this.firestore, `venues/${venueId}/objects/${objectId}/visits`);
        const visitsByDate = query(registeredVisitsRef, orderBy('timestamp'))
        return collectionData(visitsByDate, { idField: 'id' }) as Observable<any>
    }
    deleteRegisteredVisit(venueId, mochucoObjectId, visitId) {
        const visitRef = doc(this.firestore, `venues/${venueId}/objects/${mochucoObjectId}/visits/${visitId}`)
        return deleteDoc(visitRef);
    }
}

