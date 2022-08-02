import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MochucoObject } from 'src/app/pages/object/object.service';
import { AdminService, Venue } from '../../admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-objects',
  templateUrl: './admin-objects.component.html',
  styleUrls: ['./admin-objects.component.scss']
})
export class AdminObjectsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router) { }

  // objects: MochucoObject[];
  form: FormGroup;
  editmode: boolean = false;
  venueId: string
  objects$: Observable<MochucoObject[]>
  venue$: Observable<Venue>

  ngOnInit(): void {
    this.initForm()
    const venueId = this.route.snapshot.paramMap.get('venueId');
    this.venueId = this.route.snapshot.paramMap.get('venueId');
    console.log(venueId);
    this.venue$ = this.adminService.getVenueObservable(venueId);
    // this.adminService.getObjects(this.route.snapshot.paramMap.get('venueId'))
    //   .subscribe(data => console.log(data))
    // this.objects$ = this.adminService.getObjects(this.route.snapshot.paramMap.get('venueId'))
    this.objects$ = this.adminService.getObjects(this.venueId)

  }
  initForm() {

  }
  onAddObject() {
    this.router.navigate(['admin/admin-object', { venueId: this.venueId }])
  }
  onAdmin() {
    this.router.navigate(['admin'])
  }
  onEditObject(objectId: string) {
    console.log(objectId)
    this.router.navigate(['admin/admin-object', { venueId: this.venueId, objectId: objectId }])
  }
  onCreateQr(objectId: string) {
    console.log(this.venueId, objectId)

    // window.location.href = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:4200//?objectId=CoL0GoSQWMcE80u6qifV&venueId=47n1LrOgzXpoCoZXG3yq"

    window.location.href = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://mochuco-a185b.web.app/?objectId=CvdtswrMiZ1W84c07Vcg&venueId=aP8JvAco0eemJJqrWTko"


    // https://mochuco-a185b.web.app/?objectId=CvdtswrMiZ1W84c07Vcg&venueId=aP8JvAco0eemJJqrWTko
  }

  onDeleteObject(objectId: string) {
    console.log(objectId);
    this.adminService.deleteObject(this.venueId, objectId)
      .then(res => { console.log(res) })
      .catch(err => console.log(err));
  }
}
