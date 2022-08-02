import { Component, OnInit } from '@angular/core';
import { AdminService, Venue } from './admin.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public myAngularxQrCode: string = null;
  venues$: Observable<Venue[]>

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {
    this.myAngularxQrCode = 'tutsmake.com';
  }

  ngOnInit(): void {
    this.venues$ = this.adminService.getVenues();
    // this.adminService.getVenues().subscribe(data => console.log(data))
  }
  onDelete(id: string) {
    console.log(id);
    this.adminService.deleteVenue(id)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  onEdit(venueId: string) {
    console.log(venueId);
    this.router.navigate(['/admin/admin-venue', { id: venueId }]);
  }

  onAddVenue() {
    this.router.navigateByUrl('admin/admin-venue');
  }

}
