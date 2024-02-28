import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'choose-difficulty',
    loadComponent: () => import('./choose-difficulty/choose-difficulty-page.component').then(mod => mod.ChooseDifficultyPageComponent)
  },
  {
    path: 'play',
    loadChildren: () => import('./play/play.module').then(m => m.PlayModule)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy-page.component').then(mod => mod.PrivacyPolicyPageComponent)
  },
  {
    path: 'legal',
    loadComponent: () => import('./legal/legal-page.component').then(mod => mod.LegalPageComponent)
  },
  {
    path: '',
    redirectTo: 'choose-difficulty',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
