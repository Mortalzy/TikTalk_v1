import { Component, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor(){
    this.profileService.getTestAccounts()
    .subscribe(val => {
      this.profiles = val
    });
  }
}
