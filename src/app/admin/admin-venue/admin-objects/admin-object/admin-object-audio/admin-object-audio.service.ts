import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    Storage,
    ref,
    deleteObject,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
    getMetadata,
    provideStorage,
    getStorage,
    getBytes,
} from '@angular/fire/storage';

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

export interface AudioUrlData {
    audioUrl: string,
    language: string
}

@Injectable({
    providedIn: 'root'
})
export class AdminObjectAudioService {

    audioUrlData: AudioUrlData = {
        audioUrl: '',
        language: ''
    }

    private downloadUrlSubject = new BehaviorSubject<AudioUrlData>(this.audioUrlData);
    downloadUrl$ = this.downloadUrlSubject.asObservable();
    private loadingAudioSubject = new BehaviorSubject<boolean>(false);
    loadingAudio$ = this.loadingAudioSubject.asObservable();

    audioDownloadUrl: string;

    constructor(
        private storage: Storage,
        private fireStore: Firestore
    ) { }

    storeAudio(
        venueId: string,
        objectId: string,
        language: string,
        file: File) {
        const storageRef = ref(this.storage, `Mochuco/${venueId}/${objectId}/audio/${language}/${file.name}/`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        return uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error.message)
            },
            () => {
                return getDownloadURL(uploadTask.snapshot.ref).then((audioUrl) => {
                    console.log(language, audioUrl)
                    this.addPathToDb(venueId, objectId, language, audioUrl)
                    // this.addPathToFirestore(venueId, objectId, language, audioUrl)
                    this.downloadUrlSubject.next(
                        {
                            audioUrl: audioUrl,
                            language: language
                        });
                })
            }
        )
    }
    addPathToDb(venueId: string, objectId: string, language: string, audioUrl) {
        console.log(venueId, objectId, language, audioUrl);
        console.log('updating')
        const audioData = { audioUrl: audioUrl }
        const objectRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/${language}`);
        return setDoc(objectRef, audioData)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    removeFromStorage(venueId: string, objectId: string, language: string) {
        console.log(venueId, objectId, language)
        // DELETE FROM STORAGE
        const storageRef = ref(this.storage, `Mochuco/${venueId}/${objectId}/audio/${language}/mpthreetest.mp3`);
        const deleteTask = deleteObject(storageRef)
        return deleteTask
            .then(data => {
                console.log('url removed from storage', data)
                // DELETE FROM DB
                this.removeFromDb(venueId, objectId, language)
            })
            .catch(err => console.log(err));
    }
    removeFromDb(venueId, objectId, language) {
        console.log(venueId, objectId, language)
        const audioRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/${language}/`);
        return deleteDoc(audioRef)
            .then((res) => {
                console.log('url removed from DB', res)
            })
            .catch(err => console.log(err));
    }

    // ==========================
    // audioStorage(venueId: string, objectId: string, language: string, file: File) {
    //     console.log(venueId, objectId, language, file)
    //     const fileName = file.name
    //     const storageRef = ref(this.storage, `Audio/${venueId}/${objectId}/${language}/${fileName}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     return uploadTask.on('state_changed',
    //         (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
    //             console.log('Upload is ' + progress + '% done');
    //         },
    //         (error) => {
    //             console.log(error.message)
    //         },
    //         () => {
    //             return getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
    //                 console.log(language, downloadUrl)
    //                 this.addPathToFirestore(venueId, objectId, language, downloadUrl)
    //                 this.downloadUrlSubject.next(
    //                     {
    //                         audioUrl: downloadUrl,
    //                         language: language
    //                     });


    //             })
    //         }
    //     )
    // }
    // addPathToFirestore(venueId, objectId, language, audioUrl) {
    //     console.log('updating')
    //     const audioData = { audioUrl: audioUrl }
    //     const objectRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/${language}`);
    //     return setDoc(objectRef, audioData)
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));
    // }
    // getDutchAudio(venueId, objectId) {
    //     const audioRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/dutch/`);
    //     // return docData(audioRef).subscribe(data => console.log(data))
    //     return docData(audioRef) as Observable<any>
    // }

    // getEnglishAudio(venueId, objectId) {
    //     const audioRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/english/`);
    //     return docData(audioRef) as Observable<any>
    // }
    // deleteAudio(venueId: string, objectId: string, language: string) {
    //     console.log(venueId, objectId, language)
    //     const audioRef = doc(this.fireStore, `venues/${venueId}/objects/${objectId}/audio/${language}/`);
    //     return deleteDoc(audioRef)
    // }
    getAudioCollection(venueId, objectId) {
        const audioCollectionRef = collection(this.fireStore, `venues/${venueId}/objects/${objectId}/audio`);
        return collectionData(audioCollectionRef, { idField: 'language' })
    }
}
