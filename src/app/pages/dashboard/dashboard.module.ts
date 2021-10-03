import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../shared/components/components.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    DashboardRoutingModule,
    PipesModule,
    ComponentsModule,
  ],
})
export class DashboardModule {}
