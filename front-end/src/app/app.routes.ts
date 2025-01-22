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
        path: '', // Rota para o componente Manifestation
        component: ManifestationComponent,
        data: { filterResponded: false }, // Por padrão, sem filtro
      },
      {
        path: 'respondidas', // Rota para mostrar manifestações com comentários
        component: ManifestationComponent,
        data: { filterResponded: true }, // Com filtro para respondidas
      },
      {
        path: 'postagens', // Rota para o componente Manifestation
        component: PostagensComponent,
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
