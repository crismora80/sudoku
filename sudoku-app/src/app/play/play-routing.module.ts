import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayPageComponent } from './components/play-page/play-page.component';
import { CanDeactivateGuard } from './guards/can.leave.page.guard';

const routes: Routes = [
  {
    path: '',
    component: PlayPageComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
