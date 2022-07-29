import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  selectedLanguageSubject = new BehaviorSubject<string>('nl')
  selectedLanguage$ = this.selectedLanguageSubject.asObservable()

  constructor() { }

  setIsLoading(status: boolean) {
    console.log('isLoading status: ', status);
    this.isLoadingSubject.next(status)
  }
  setLanguage(language: string) {
    this.selectedLanguageSubject.next(language)
  }
}
