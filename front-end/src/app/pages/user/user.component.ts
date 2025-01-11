import { Component } from '@angular/core';
import { ManifestationComponent } from '../../components/manifestation/manifestation.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ManifestationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  constructor() {}

  // user?: User | undefined | null;

  ngOnInit(): void {
    // this.auth.user$.subscribe((user) => {
    //   this.user = user;
    // });
  }
}
