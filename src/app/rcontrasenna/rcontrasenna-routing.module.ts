import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RcontrasennaPage } from './rcontrasenna.page';

const routes: Routes = [
  {
    path: '',
    component: RcontrasennaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RcontrasennaPageRoutingModule {}
