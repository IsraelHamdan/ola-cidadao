import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FeedComponent } from './components/feed/feed.component';
import { MetricasComponent } from './pages/metricas/metricas.component';
import { PrefeituraComponent } from './pages/prefeitura/prefeitura.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { NovaManifestacaoComponent } from './pages/nova-manifestacao/nova-manifestacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostagensComponent } from './components/postagens/postagens.component';
import { ManifestationComponent } from './components/manifestation/manifestation.component';

export const routes: Routes = [
  {
    path: '', // Rota principal
    component: FeedComponent, // Componente que contém o router-outlet principal
    children: [
      {
        path: '', // Rota padrão dentro de FeedComponent
        component: ManifestationComponent,
      },
      {
        path: 'postagens', // Rota para o componente Postagens
        component: PostagensComponent,
      },
      {
        path: 'manifestacoes', // Rota para o componente Manifestation
        component: ManifestationComponent,
      },
    ],
  },
  { path: 'metricas', component: MetricasComponent },
  { path: 'prefeitura', component: PrefeituraComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'nova-manifestacao', component: NovaManifestacaoComponent },

  // {
  //   path: 'dashboard', // Componente A
  //   component: FeedComponent,
  //   children: [
  //     {
  //       path: '', // Página padrão do dashboard (componente B)
  //       component: ManifestationComponent,
  //       children: [
  //         { path: 'manifestacoes', component: ManifestationComponent }, // Outlet de B
  //         { path: 'postagens', component: PostagensComponent }, // Outlet de B
  //       ],
  //     },
  //   ],
  // },


  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
