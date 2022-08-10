import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isLoadingImageSubject = new BehaviorSubject<boolean>(false);
    public isLoadingImage$ = this.isLoadingImageSubject.asObservable()

    private selectedLanguageSubject = new BehaviorSubject<string>('nl')
    public selectedLanguage$ = this.selectedLanguageSubject.asObservable()

    constructor() { }

    setIsLoading(status: boolean) {
        // console.log('isLoading status: ', status);
        this.isLoadingSubject.next(status)
    }

    setIsLoadingImage(status: boolean) {
        console.log(status);
        this.isLoadingImageSubject.next(status);
    }

    setLanguage(language: string) {
        this.selectedLanguageSubject.next(language)
    }
}
