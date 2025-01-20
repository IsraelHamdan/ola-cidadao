import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.sass',
})
export class SidebarRightComponent {
  tags: boolean = false;

  moreTags() {
    this.tags = !this.tags;
  }
}
