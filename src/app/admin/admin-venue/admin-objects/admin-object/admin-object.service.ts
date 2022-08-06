import { Injectable } from '@angular/core';
import {
    Storage,
    ref,
    deleteObject,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class AdminObjectService {

    constructor(
        private storage: Storage
    ) { }

    async uploadImage(
        folder: string,
        filename: string,
        file: File | null
    ): Promise<string> {
        console.log(file.name)
        console.log(folder, filename, file);

        const ext = file!.name.split('.').pop();

        const path = `${folder}/${filename}.${ext}`; {

            if (file) {
                try {
                    const storageRef = ref(this.storage, path);
                    const task = uploadBytesResumable(storageRef, file);
                    // this.uploadPercent = percentage(task);
                    await task;
                    const url = await getDownloadURL(storageRef);
                    console.log(url)
                    return url;
                } catch (e: any) {
                    console.error(e);
                }
            }
        }
    }
}
