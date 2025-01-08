import { Component } from '@angular/core';
import { ManifestationComponent } from "../components/manifestation/manifestation.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ManifestationComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.sass'
})
export class MainContentComponent {

}
