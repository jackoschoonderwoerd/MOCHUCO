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
import { Observable } from 'rxjs';
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
    return collectionData(objectsRef, { idField: 'id' }) as Observable<MochucoObject[]>
    // return collectionData(objectsRef, { idField: 'id' })
  }
  getObject(venueId, objectId) {
    const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
    return docData(objectRef)
  }
  updateObject(venueId, object: MochucoObject) {
    console.log(venueId, object)
    const objectRef = doc(this.firestore, `venues/${venueId}/objects/${object.id}`);
    return setDoc(objectRef, object);
  }
  deleteObject(venueId: string, objectId: string) {
    const objectRef = doc(this.firestore, `venues/${venueId}/objects/${objectId}`);
    return deleteDoc(objectRef)
  }
}
// https://mochuco-a185b.web.app/?objectId=lkABWUgRvISu98r9NmqA&venueId=47n1LrOgzXpoCoZXG3yq
