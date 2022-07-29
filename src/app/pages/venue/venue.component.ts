import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../object/object.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

  constructor(
    public objectService: ObjectService,
    public uiService: UiService
  ) { }

  ngOnInit(): void {
  }

}
