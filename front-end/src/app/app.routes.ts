import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { MainContentComponent } from './components/main-content/main-content.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'user', component: UserComponent },
];
