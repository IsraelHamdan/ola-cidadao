import { Component } from '@angular/core';
import { ManifestationComponent } from "../manifestation/manifestation.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ManifestationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent {

}
