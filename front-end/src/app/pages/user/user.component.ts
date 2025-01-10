import { Component } from '@angular/core';
import { ManifestationComponent } from '../../components/manifestation/manifestation.component';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ManifestationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  constructor(public auth: AuthService) {}

  user?: User | undefined | null;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
