import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminService, Location } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { LanguageService } from '../language-manager/language.service';
import { Observable } from 'rxjs';
import { LanguageData } from 'src/app/shared/models';

import { MatDialog } from '@angular/material/dialog';





@Component({
    selector: 'app-admin-venue',
    templateUrl: './admin-venue.component.html',
    styleUrls: ['./admin-venue.component.scss']
})
export class AdminVenueComponent implements OnInit {

    form: FormGroup;
    editmode: boolean = false;
    venueId: string;
    venue: Location;
    languages$: Observable<LanguageData[]>
    forms: FormGroup[] = [];

    constructor(
        private fb: FormBuilder,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        // public languageService: LanguageService,


    ) { }

    ngOnInit(): void {
        this.initForm();
        // this.languages$ = this.languageService.getLanguages()
        if (this.route.snapshot.paramMap.get('id')) {
            this.venueId = this.route.snapshot.paramMap.get('id');
            //   console.log(this.venueId)
            this.editmode = true;

            this.adminService.getLocation(this.route.snapshot.paramMap.get('id'))
                .subscribe((venue: Location) => {
                    this.venue = venue
                    this.form.setValue({ ...venue });
                })
        }
        // console.log(this.editmode);
    }
    initForm() {
        this.form = this.fb.group({
            id: new FormControl(null),
            nameNl: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
            nameEn: new FormControl(null, [Validators.required]),
            contentNl: new FormControl(null, [Validators.required]),
            contentEn: new FormControl(null, [Validators.required]),
            // languageOptions: new FormControl(null),
            // languages: new FormArray([])
        })
    }


    getLanguageControls() {
        // console.log((<FormArray>this.form.get('languages')).controls);
        // return (<FormArray>this.form.get('languages')).controls;
    }


    onAddVenue() {
        const venue: Location = {
            ...this.form.value
        }
        console.group(this.form.value)
        // return;
        if (!this.editmode) {
            this.adminService.addVenue(venue)
                .then((data: any) => {
                    console.log(data._key.path.segments[1])
                    this.router.navigate(['admin']);
                })
                .catch(err => console.log(err))
        } else {
            venue.id = this.venueId
            this.adminService.updateVenue(venue)
                .then(res => {
                    console.log(res);
                    this.router.navigate(['/admin'])
                })
                .catch(err => console.log(err));
        }
    }

    onObjects() {
        this.router.navigate(['/admin/admin-objects', { venueId: this.venueId, venueNameNl: this.venue.nameNl }])
    }
}
