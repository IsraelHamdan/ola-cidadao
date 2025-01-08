import { Component } from '@angular/core';
import { ManifestationComponent } from '../manifestation/manifestation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ManifestationComponent, RouterOutlet],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.sass',
})
export class MainContentComponent {}
