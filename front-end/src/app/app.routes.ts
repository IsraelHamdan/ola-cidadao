import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FeedComponent } from './components/feed/feed.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'user', component: UserComponent },
];
