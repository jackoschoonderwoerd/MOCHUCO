import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AdminService, Venue } from '../../../../admin.service';
import { MochucoObject } from '../../../../../pages/object/object.service';
import { AdminObjectAudioService, AudioUrlData } from './admin-object-audio.service';
import { UiService } from '../../../../../shared/ui.service';

@Component({
    selector: 'app-admin-object-audio',
    templateUrl: './admin-object-audio.component.html',
    styleUrls: ['./admin-object-audio.component.scss']
})
export class AdminObjectAudioComponent implements OnInit {

    languages: string[] = ['nl', 'en']

    @Input() venueId: string;
    @Input() objectId: string;
    editmode: boolean = false;
    mochucoObject: MochucoObject;
    venue: Venue
    audioUrlsData: AudioUrlData[] = []
    @ViewChild('audioInput') audioInput: ElementRef

    constructor(
        private adminService: AdminService,
        private adminObjectAudioService: AdminObjectAudioService,
        private uiService: UiService
    ) { }

    ngOnInit(): void {
        this.adminObjectAudioService.getAudioCollection(this.venueId, this.objectId)
            .subscribe((audioUrlsData: AudioUrlData[]) => {
                console.log(audioUrlsData)
                this.audioUrlsData = audioUrlsData
            });
        console.log(this.venueId, this.objectId)



        if (this.objectId) {
            this.editmode = true
            this.adminService.getObject(this.venueId, this.objectId)
                .subscribe((mochucoObject: MochucoObject) => {
                    this.mochucoObject = mochucoObject
                })
            this.adminService.getVenue(this.venueId)
                .subscribe((venue: Venue) => {
                    this.venue = venue
                })
        }
    }

    onFileChange(e, language) {
        const file = e.target.files[0]
        console.log(file, language);
        this.adminObjectAudioService.storeAudio(
            this.venue.id,
            this.mochucoObject.id,
            language,
            file)
        console.log(this.audioInput.nativeElement.files);
        this.audioInput.nativeElement.value = '';
        console.log(this.audioInput.nativeElement.files);
    }
    onDeleteAudio(language: string) {
        if (confirm('are you sure?')) {
            this.adminObjectAudioService.removeFromStorage(this.venueId, this.objectId, language)

        } else {
            alert('nothing deleted');
        };
        return;
    }



}
