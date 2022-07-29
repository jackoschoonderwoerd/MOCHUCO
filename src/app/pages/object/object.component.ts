import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectService } from './object.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  object: Object
  // object$: Observable<Object>;

  constructor(
    private route: ActivatedRoute,
    public objectService: ObjectService,
    public uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.objectService.object$.subscribe((object: Object) => {
      console.log(object);
    })
    this.uiService.selectedLanguage$.subscribe((language: string) => {
      console.log(language)
    })
  }

}
