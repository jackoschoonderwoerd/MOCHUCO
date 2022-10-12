// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {
//     Firestore,
//     addDoc,
//     collection,
//     collectionData,
//     collectionGroup,
//     doc,
//     docData,
//     deleteDoc,
//     updateDoc,
//     DocumentReference,
//     setDoc,
//     orderBy,
//     query
// } from '@angular/fire/firestore';

// export interface LocationByLanguage {
//     language: string;
//     description: {
//         name: string;
//         content: string;
//         audioUrl?: string;
//     }
// }

// export interface ObjectDescriptionByLanguage {
//     language: string;
//     description: {
//         name: string;
//         content: string;
//         audioUrl?: string;
//     }
// }

// export interface Location {
//     venueIdentifier?: string;
//     venueImageUrl?: string;
//     venueDescriptionsByLanguage: LocationByLanguage[]
//     newObjects?: NewObject[]
// }

// export interface NewObject {
//     objectIdentifier: string;
//     objectImageUrl: string;
//     objectDescriptionsByLanguage: ObjectDescriptionByLanguage[]
// }

// @Injectable({
//     providedIn: 'root'
// })


export class AdminVenueService {



    // constructor(private firestore: Firestore) { }

    // addLocation(venue: Location) {
    //     venue.venueImageUrl = 'https://tse2.mm.bing.net/th?id=OIP.bT8Wk7lV5eY7mtAoCUiS4gHaEf&pid=Api&P=0'
    //     console.log(venue);
    //     const venueRef = collection(this.firestore, 'new-venues')
    //     return addDoc(venueRef, venue)
    // }

    // getLocations() {
    //     const venuesRef = collection(this.firestore, 'new-venues');
    //     return collectionData(venuesRef, { idField: 'id' }) as Observable<Location[]>
    // }







    // venue: Location = {
    //     venueIdentifier: 'amsterdamseBruggen',
    //     venueImageUrl: '',
    //     venueDescriptionsByLanguage: [
    //         {
    //             language: 'german',
    //             description: {
    //                 name: 'muntsluis',
    //                 content: 'muntsluis description',
    //                 audioUrl: ''
    //             }
    //         },
    //         {
    //             language: 'english',
    //             description: {
    //                 name: 'muntsluis',
    //                 content: 'muntsluis description',
    //                 audioUrl: ''
    //             }
    //         },
    //     ],
    //     newObjects: [
    //         {
    //             objectIdentifier: 'krijtbrug',
    //             objectImageUrl: '',
    //             objectDescriptionsByLanguage: [
    //                 {
    //                     language: 'german',
    //                     description: {
    //                         name: 'krijtbrug',
    //                         content: 'krijtbrug content',
    //                         audioUrl: ''
    //                     }
    //                 },
    //                 {
    //                     language: 'english',
    //                     description: {
    //                         name: 'krijtbrug',
    //                         content: 'krijtbrug content',
    //                         audioUrl: ''
    //                     }
    //                 },
    //             ]
    //         }

    //     ]
    // }


}


