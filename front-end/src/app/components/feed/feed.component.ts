import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass',
})
export class FeedComponent {}
