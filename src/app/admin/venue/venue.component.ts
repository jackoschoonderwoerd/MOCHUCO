import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

  venueForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initVenueForm()
  }

  initVenueForm() {
    this.venueForm = this.fb.group({
      name: new FormControl('venue_004', [Validators.required])
    })
  }

}
