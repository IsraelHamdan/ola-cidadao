import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.sass',
})
export class SidebarLeftComponent {

  constructor(public auth: AuthService) {}
  user?: User | undefined | null;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
}

}
