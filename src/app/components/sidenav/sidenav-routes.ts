import { RouterConfig } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';
import { Dummy } from '../dummy/dummy.component';

export const sideNavRoutes: RouterConfig = [
  {
      path: 'dashboard',
      component: DashboardComponent
  },
  {
      path: 'my-bills',
      component: RecentActivityComponent
  },
  {
      path: 'alerts',
      component: Dummy
  },
  {
      path: 'enroll-bill-pay',
      component: Dummy
  },
  {
      path: 'edit-profile',
      component: Dummy
  },
];