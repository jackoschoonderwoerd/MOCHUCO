import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MochucoObject } from '../../../../pages/object/object.service';

// import { AngularFireStorage } from '@angular/fire/storage';
import { AdminObjectService } from './admin-object.service';

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
        private adminObjectService: AdminObjectService) { }


    form: FormGroup;
    editmode: boolean = false;
    venueId: string;
    objectId: string;
    objectUrl: string;
    objectUrlDev: string;
    imageUrl: string;
    venueName: string;
    mochucoObject: MochucoObject;
    @ViewChild('img') img: any;

    ngOnInit(): void {
        this.initForm()
        this.venueId = this.route.snapshot.paramMap.get('venueId');
        this.objectId = this.route.snapshot.paramMap.get('objectId');
        this.venueName = this.route.snapshot.paramMap.get('venueName').replace('%', ' ');
        console.log(this.venueId, this.objectId);
        if (this.objectId) {
            this.objectUrl = `https://mochuco-a185b.web.app/?site=mochuco&objectId=${this.objectId}&venueId=${this.venueId}`
            this.objectUrlDev = `http://localhost:4200//?site=mochuco&objectId=${this.objectId}&venueId=${this.venueId}`
            this.editmode = true;
            this.adminService.getObject(this.venueId, this.objectId).subscribe((mochucoObject: MochucoObject) => {
                this.mochucoObject = mochucoObject;
                if (!mochucoObject.imageUrl) {
                    mochucoObject.imageUrl = ''
                }
                this.form.setValue({
                    ...mochucoObject
                });
                this.imageUrl = mochucoObject.imageUrl
            })
        }
        console.log(this.editmode);



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
            imageUrl: new FormControl(null)

        })
    }

    onUploadImage(e) {

        const file = e.target.files[0]
        const filename = e.target.files[0].name.split('.')[0];
        const filepath = `Mochuco/${this.venueName}` 
        this.adminObjectService.uploadImage('Mochuco/' + this.venueName, '-img-' + filename + '-img-', file)
            .then((imageUrl: string) => {
                console.log(imageUrl);
                this.imageUrl = imageUrl
                this.onAddObject();
            })
            .catch((err) => console.log(err));
    }

    onDeleteImage() {
        if (confirm('this will delete the image from the database and storage')) {
            const url: string = this.img.nativeElement.src.toString();
            const fileName = '-img-' + url.split('-img-')[1] + '-img-' + '.jpg'
            const path = `Mochuco/${this.venueName}/${fileName}`
            this.adminObjectService.deleteImage(path)
                .then(res => {
                    console.log(res);
                    this.mochucoObject.imageUrl = null;
                    this.adminService.updateObject(this.venueId, this.mochucoObject)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            alert('nothing deleted');
        }
    }

    onAddObject() {
        const object: MochucoObject = { ...this.form.value }
        // object.objectUrl = this.objectUrl;
        if (!this.editmode) {
            this.adminService.addObject(this.venueId, object)
                .then((data: any) => {
                    const segments = data._key.path.segments
                    console.log(data._key.path.segments[segments.length - 1]);
                    object.id = data._key.path.segments[segments.length - 1];
                    object.imageUrl = this.imageUrl;
                    object.objectUrl = `https://mochuco-a185b.web.app/?site=mochuco&objectId=${object.id}&venueId=${this.venueId}`
                    object.objectUrlDev = this.objectUrlDev = `http://localhost:4200//?site=mochuco&objectId=${object.id}&venueId=${this.venueId}`
                    this.adminService.updateObject(this.venueId, object)
                        .then(res => {
                            console.log(res)

                            this.router.navigate(['admin/admin-objects', { venueId: this.venueId }])
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }

        else {
            object.id = this.objectId;
            object.imageUrl = this.imageUrl;

            console.log(object);
            this.adminService.updateObject(this.venueId, object)
                .then(res => {
                    this.router.navigate(['/admin/admin-objects', { venueId: this.venueId }])
                })
                .catch(err => console.log(err));
        }
    }



    onAdmin() {
        this.router.navigate(['admin']);
    }

}
