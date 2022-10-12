import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../admin/admin.service';
import { LanguageData } from './models';

// import { SelectLanguageService } from '../navigation/footer/select-language/select-language.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isLoadingImageSubject = new BehaviorSubject<boolean>(false);
    public isLoadingImage$ = this.isLoadingImageSubject.asObservable()

    private activeVenueSubject = new BehaviorSubject<Location>(null)
    public activeVenue$ = this.activeVenueSubject.asObservable()

    private selectedLanguageSubject = new BehaviorSubject<string>('nl');
    public selectedLanguage$ = this.selectedLanguageSubject.asObservable()

    constructor(

        // private selectLanguageService: SelectLanguageService,
        // private snackbarService: MatSnackBar
    ) { }

    setIsLoading(status: boolean) {
        // console.log('isLoading status: ', status);
        this.isLoadingSubject.next(status)
    }

    setIsLoadingImage(status: boolean) {
        console.log(status);
        this.isLoadingImageSubject.next(status);
    }
    setSelectedLanguage(language: string) {
        this.selectedLanguageSubject.next(language);
    }
    // openSnackBar(message: string) {
    //     this.snackbarService.open(message, null, { duration: 5000 });
    // }

}
