import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FeedComponent } from './components/feed/feed.component';
import { MetricasComponent } from './pages/metricas/metricas.component';
import { PrefeituraComponent } from './pages/prefeitura/prefeitura.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { NovaManifestacaoComponent } from './pages/nova-manifestacao/nova-manifestacao.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'user', component: UserComponent, canActivate: [authGuardFn] },
  { path: 'metricas', component: MetricasComponent },
  { path: 'prefeitura', component: PrefeituraComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'nova-manifestacao', component: NovaManifestacaoComponent },
];
