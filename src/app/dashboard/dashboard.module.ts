import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';

import { routing } from './dashboard-routing.module';

@NgModule({
  imports: [routing],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
