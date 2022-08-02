import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService, Venue } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-admin-venue',
  templateUrl: './admin-venue.component.html',
  styleUrls: ['./admin-venue.component.scss']
})
export class AdminVenueComponent implements OnInit {

  form: FormGroup;
  editmode: boolean = false;
  venueId: string;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    if (this.route.snapshot.paramMap.get('id')) {
      this.venueId = this.route.snapshot.paramMap.get('id');
      console.log(this.venueId)
      this.editmode = true;

      this.adminService.getVenue(this.route.snapshot.paramMap.get('id'))
        .subscribe((venue: Venue) => {
          console.log(venue)
          this.form.setValue({ ...venue });
        })
    }
    console.log(this.editmode);
  }
  initForm() {
    this.form = this.fb.group({
      id: new FormControl(null),
      nameNl: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      contentNl: new FormControl(null, [Validators.required]),
      contentEn: new FormControl(null, [Validators.required])
    })
  }
  onAddVenue() {
    const venue: Venue = {
      ...this.form.value
    }
    console.group(this.form.value)
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
    this.router.navigate(['/admin/admin-objects', { venueId: this.venueId }])
  }
}
