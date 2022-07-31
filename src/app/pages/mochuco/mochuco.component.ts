import { Component, OnInit } from '@angular/core';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-mochuco',
  templateUrl: './mochuco.component.html',
  styleUrls: ['./mochuco.component.scss']
})
export class MochucoComponent implements OnInit {

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }

}
