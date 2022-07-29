import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScannerService } from '../../pages/scanner/scanner.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    public scannerService: ScannerService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }
  onScanner() {
    this.router.navigateByUrl('scanner')
  }
  onSelectLanguage(language: string) {
    this.uiService.setLanguage(language)
  }
}
