
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

export interface Object {
  id?: string
  name: string,
  htmlContent: string
}
export interface Venue {
  name: string;
  contentNl: string;
  id?: string;
  objects: Object[]
}

@Injectable({
  providedIn: 'root'
})


export class ObjectService {

  object: Object = {
    name: '',
    htmlContent: ''
  }
  venue: Venue = {
    name: '',
    contentNl: '',
    objects: []
  }


  private objectSubject = new BehaviorSubject<Object>(this.object)
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
    console.log('objectService 55: ', venueId, objectId)
    const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`)
    return docData(objectRef) as Observable<any>;
  }

  setVenue(venueId) {
    console.log('object.service 106 setVenue(){}', venueId)
    const venueRef = doc(this.fs, `venues/${venueId}`)
    docData(venueRef).subscribe((venue: Venue) => {
      console.log(venue);
      this.venue = venue;
      this.venueSubject.next(venue);
    })
  }


  setVenueObjects(venueId: string) {
    console.log('venuservice 94', venueId)
    const venueRef = collection(this.fs, `venues/${venueId}/objects`);
    collectionData(venueRef, { idField: 'id' }).subscribe((venueObjects: Object[]) => {
      this.venue.objects = venueObjects
      console.log(this.venue)
    })
  }

  setObject(venueId: string, objectId: string, source: string) {
    console.log('service 69: setObject()', venueId, objectId, source);
    const objectRef = doc(this.fs, `venues/${venueId}/objects/${objectId}`);
    docData(objectRef).subscribe((object: Object) => {
      this.object = object;
      console.log('objectService 73', object);
      this.object = object;
      this.objectSubject.next(object)
      this.uiService.setIsLoading(false);
      this.router.navigateByUrl('object');
    })
  }

  refreshObject(objectId) {
    // console.log(this.venue, objectId)
    const index = this.venue.objects.findIndex((object: Object) => {
      return object.id === objectId
    });
    // console.log('index: ', index);
    // console.log(this.venue.objects[index]);
    const object: Object = this.venue.objects[index]
    console.log(object);
    this.objectSubject.next(object);
    this.uiService.setIsLoading(false);
    this.router.navigateByUrl('object');

  }

}
