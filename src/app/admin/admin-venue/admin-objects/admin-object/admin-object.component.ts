import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MochucoObject, ObjectService } from '../../../../pages/object/object.service';

// import { AngularFireStorage } from '@angular/fire/storage';
import { AdminObjectService, ImageUploadData } from './admin-object.service';
import { Observable } from 'rxjs';
import { Venue } from 'src/app/admin/admin.service';

@Component({
    selector: 'app-admin-object',
    templateUrl: './admin-object.component.html',
    styleUrls: ['./admin-object.component.scss']
})
export class AdminObjectComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private adminService: AdminService,
        private fb: FormBuilder,
        private router: Router,
        private adminObjectService: AdminObjectService,
        public objectService: ObjectService) { }


    form: FormGroup;
    editmode: boolean = false;
    venueId: string;
    objectId: string;
    // objectUrl: string;
    // objectUrlDev: string;
    imageUrl: string;
    // venueName: string;
    mochucoObject: MochucoObject;
    // imageStoragePath: string;
    imageUploadData: ImageUploadData;
    isStoringImage: boolean = false;
    venue$: Observable<Venue>
    venue: Venue
    @ViewChild('fileInput') fileInput: ElementRef;


    ngOnInit(): void {
        this.initForm()
        this.venueId = this.route.snapshot.paramMap.get('venueId');
        // const venueId = this.route.snapshot.paramMap.get('venueId')
        this.adminService.getVenue(this.venueId).subscribe((venue: Venue) => {
            this.venue = venue;
            console.log(this.venue)
        })
        this.venue$ = this.adminService.getVenueObservable(this.venueId);
        this.objectId = this.route.snapshot.paramMap.get('objectId');
        // this.objectService.getTimesVisited(this.objectId, this.venueId)
        if (this.objectId) {
            this.editmode = true;
            this.adminService.getObject(this.venueId, this.objectId).subscribe((mochucoObject: MochucoObject) => {
                this.mochucoObject = mochucoObject;
                if (this.mochucoObject && this.mochucoObject.imageUploadData) {
                    this.imageUrl = this.mochucoObject.imageUploadData.imageUrl
                }
                this.form.patchValue({
                    ...this.mochucoObject
                });
            })
        }
    }

    initForm() {
        this.form = this.fb.group({
            id: new FormControl(null),
            nameNl: new FormControl(null, [Validators.required]),
            nameEn: new FormControl(null),
            contentNl: new FormControl(null, [Validators.required]),
            contentEn: new FormControl(null),
            objectUrl: new FormControl(null),
            objectUrlDev: new FormControl(null),
            imageUploadData: new FormControl(null),
            timesVisitedId: new FormControl(null)
        })
    }

    onUploadImage(e) {
        // this.onAddObject()
        this.isStoringImage = true;
        const file = e.target.files[0];
        const filename = e.target.files[0].name.split('.')[0];
        const filepath = `Mochuco/${this.venue.nameNl}`;

        this.adminObjectService.uploadImage(filepath, filename, file)
            .then((imageUploadData: ImageUploadData) => {
                this.isStoringImage = false;
                this.imageUrl = imageUploadData.imageUrl;
                this.form.patchValue({
                    imageUploadData: imageUploadData
                });
                console.log('imageUploadData added to form', 'preview image')
            })
            .catch((err) => console.log(err));
        this.fileInput.nativeElement.value = '';
    }

    onDeleteImage() {
        if (confirm('this will delete the image from the database and storage')) {
            const path = this.mochucoObject.imageUploadData.imageStoragePath;
            this.adminObjectService.deleteImage(path)
                .then(res => {
                    console.log('image deleted from storage');
                    this.mochucoObject.imageUploadData.imageUrl = null;
                    this.mochucoObject.imageUploadData.imageStoragePath = null;
                    this.adminService.updateObject(this.venueId, this.mochucoObject)
                        .then(res => {
                            console.log('image deleted from db');

                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            alert('nothing deleted');
        }
        this.fileInput.nativeElement.value = '';
    }

    onAddObject() {
        this.mochucoObject = { ...this.form.value }
        console.log(this.mochucoObject);
        console.log(this.editmode);
        if (!this.editmode) {
            console.log('NEW MOCHUCOOBJECT: ', this.mochucoObject);
            // ADD IMAGE?
            if (this.imageUploadData) {
                console.log(this.imageUploadData)
                this.mochucoObject.imageUploadData = this.imageUploadData
            } else {
                console.log('NO IMAGE UPLOAD DATA: ', this.imageUploadData);
            }

            this.adminService.addObject(this.venueId, this.mochucoObject)
                .then((data: any) => {
                    console.log(data)
                    console.log(data.id)
                    this.mochucoObject.id = data.id


                    // ADD URLS
                    this.mochucoObject.objectUrl =
                        `https://mochuco-a185b.web.app/?site=mochuco&objectId=${this.mochucoObject.id}&venueId=${this.venueId}`;
                    this.mochucoObject.objectUrlDev =
                        `http://localhost:4200//?site=mochuco&objectId=${this.mochucoObject.id}&venueId=${this.venueId}`;


                    // // ADD IMAGE?
                    // if (this.imageUploadData) {
                    //     console.log(this.imageUploadData)
                    //     this.mochucoObject.imageUploadData = this.imageUploadData
                    // } else {
                    //     console.log('NO IMAGE UPLOAD DATA: ', this.imageUploadData);
                    // }
                    this.adminService.updateObject(this.venueId, this.mochucoObject)
                        .then(res => {
                            console.log(console.log('object updated'))

                            this.router.navigate(['admin/admin-objects', { venueId: this.venueId }])
                        })

                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
                .then((res) => {
                    this.adminService.addTimesVisitedZero(this.venue.id, this.mochucoObject.id)
                })
                .then(res => {
                    console.log('scoreZero added')
                })
                .catch(err => console.log(err))
                .then(res => {
                    this.adminService.addLikesZero(this.venue.id, this.mochucoObject.id)
                })
                .then(res => {
                    console.log('likesZeroAdded');
                })
                .catch(err => console.log(err));
        }
        else {
            this.mochucoObject = {
                ...this.form.value
            }
            console.log('OLD MOCHUCOOBJECT: ', this.mochucoObject);
            console.log(this.mochucoObject);
            this.adminService.updateObject(this.venueId, this.mochucoObject)
                .then(res => {
                    console.log('OBJECT UPDATED')
                    this.router.navigate(['/admin/admin-objects', { venueId: this.venueId }])
                })
                .catch(err => console.log(err));
        }
    }
}
