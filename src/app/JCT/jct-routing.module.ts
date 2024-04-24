import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { CheckinComponent } from './checkin.component';
import { VIWSComponent } from './viws.component';

const routes: Routes = [
  { path: '', component: VIWSComponent },
  { path: 'checkin', component: LayoutComponent, children: [{ path: '', component: CheckinComponent }] },
      { path: 'edit/:id', component: CheckinComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckinRoutingModule { }
