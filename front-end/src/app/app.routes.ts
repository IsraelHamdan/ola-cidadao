import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { FeedComponent } from './components/feed/feed.component';
import { MetricasComponent } from './pages/metricas/metricas.component';
import { PrefeituraComponent } from './pages/prefeitura/prefeitura.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { NovaManifestacaoComponent } from './pages/nova-manifestacao/nova-manifestacao.component';
import { PostagensComponent } from './components/postagens/postagens.component';
import { ManifestationComponent } from './components/manifestation/manifestation.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    children: [
      {
        path: '',
        component: ManifestationComponent,
        data: { filterResponded: false },
      },
      {
        path: 'respondidas',
        loadComponent: () =>
          import('./components/manifestation/manifestation.component').then(
            (m) => m.ManifestationComponent
          ),
        data: { filterResponded: true },
      },
      {
        path: 'postagens',
        loadComponent: () =>
          import('./components/postagens/postagens.component').then(
            (m) => m.PostagensComponent
          ),
      },
    ],
  },
  {
    path: 'metricas',
    loadComponent: () =>
      import('./pages/metricas/metricas.component').then(
        (m) => m.MetricasComponent
      ),
  },
  {
    path: 'prefeitura',
    loadComponent: () =>
      import('./pages/prefeitura/prefeitura.component').then(
        (m) => m.PrefeituraComponent
      ),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes.component').then(
        (m) => m.ConfiguracoesComponent
      ),
  },
  {
    path: 'nova-manifestacao',
    loadComponent: () =>
      import('./pages/nova-manifestacao/nova-manifestacao.component').then(
        (m) => m.NovaManifestacaoComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./pages/user/user.component').then((m) => m.UserComponent),
    children: [
      {
        path: '',
        component: ManifestationComponent,
        data: { loadUserManifestations: true, filterResponded: false },
      },
      {
        path: 'respondidas',
        loadComponent: () =>
          import('./components/manifestation/manifestation.component').then(
            (m) => m.ManifestationComponent
          ),
        data: { loadUserManifestations: true, filterResponded: true },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
