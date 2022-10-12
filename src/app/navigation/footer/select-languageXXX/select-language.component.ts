import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SelectLanguageService } from './select-language.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UiService } from '../../../shared/ui.service';
import { LanguageData } from 'src/app/shared/models';

@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

    languages: LanguageData[]
    languages$: Observable<LanguageData[]>

    constructor(
        private selectLanguageService: SelectLanguageService,
        private dialogRef: MatDialogRef<SelectLanguageComponent>,
        private uiService: UiService) { }

    ngOnInit(): void {
        // this.languages = this.selectLanguageService.getLanguages()
        // this.languages$ = this.selectLanguageService.getLanguages()
    }
    onLanguage(id: string) {
        console.log(id);
        // this.selectLanguageService.setLanguage(id)
        // this.uiService.setLanguage(id)
        // this.dialogRef.close();
    }

}
