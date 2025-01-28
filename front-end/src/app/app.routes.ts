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
  {
    path: 'user', // Rota principal
    component: UserComponent, // Componente que contém o router-outlet principal
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
    ],
  },
  // { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
  // { path: '', redirectTo: '', pathMatch: 'full' },
];
