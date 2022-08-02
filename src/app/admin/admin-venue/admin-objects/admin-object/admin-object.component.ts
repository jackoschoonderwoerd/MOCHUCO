import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MochucoObject } from '../../../../pages/object/object.service';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

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
    private router: Router) { }


  form: FormGroup;
  editmode: boolean = false;
  venueId: string;
  objectId: string;
  objectUrl: string;
  objectUrlDev: string;

  ngOnInit(): void {
    this.initForm()
    this.venueId = this.route.snapshot.paramMap.get('venueId');
    this.objectId = this.route.snapshot.paramMap.get('objectId');
    console.log(this.venueId, this.objectId);
    if (this.objectId) {
      this.objectUrl = `https://mochuco-a185b.web.app/?objectId=${this.objectId}&venueId=${this.venueId}`
      this.objectUrlDev = `http://localhost:4200//?objectId=${this.objectId}&venueId=${this.venueId}`
      this.editmode = true;
      this.adminService.getObject(this.venueId, this.objectId).subscribe((object: MochucoObject) => {
        this.form.setValue({
          ...object
        });
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
      objectUrlDev: new FormControl(null)

    })
  }
  onAddObject() {

    const object: MochucoObject = { ...this.form.value }
    // object.objectUrl = this.objectUrl;
    if (!this.editmode) {
      this.adminService.addObject(this.venueId, object)
        .then((data: any) => {
          const segments = data._key.path.segments
          console.log(data._key.path.segments[segments.length - 1]);
          object.id = data._key.path.segments[segments.length - 1]
          object.objectUrl = `https://mochuco-a185b.web.app/?objectId=${object.id}&venueId=${this.venueId}`
          object.objectUrlDev = this.objectUrlDev = `http://localhost:4200//?objectId=${object.id}&venueId=${this.venueId}`
          this.adminService.updateObject(this.venueId, object)
            .then(res => {
              console.log(res)
              this.router.navigate(['admin/admin-venue', { venueId: this.venueId }])
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
    else {
      object.id = this.objectId;
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
