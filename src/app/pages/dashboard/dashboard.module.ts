import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PipesModule,
    NgbPaginationModule,
  ],
})
export class DashboardModule {}
