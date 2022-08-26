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
    getMetadata
} from '@angular/fire/storage';

export class ImageUploadData {
    imageUrl: string;
    imageStoragePath: string;
}

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
    ): Promise<ImageUploadData> {
        // console.log(file.name)
        // console.log(folder, filename, file);

        const ext = file!.name.split('.').pop();

        const path = `${folder}/${filename}.${ext}`; {

            // console.log(path);

            if (file) {
                try {
                    const storageRef = ref(this.storage, path);
                    const task = uploadBytesResumable(storageRef, file);
                    // this.uploadPercent = percentage(task);
                    await task;
                    const url = await getDownloadURL(storageRef);
                    const metadata = await getMetadata(storageRef);

                    // console.log(url)
                    // console.log(metadata.fullPath)

                    const imageUploadData: ImageUploadData = {
                        imageUrl: url,
                        imageStoragePath: metadata.fullPath
                    }
                    // return url;
                    return imageUploadData
                } catch (e: any) {
                    console.error(e);
                }
            }
        }
    }
    deleteImage(filepath) {
        const storageRef = ref(this.storage, filepath)
        return deleteObject(storageRef)

    }
    removeImageFromDb() { }


}
