import { provideRouter, RouterConfig }  from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { sideNavRoutes } from './components/sidenav/sidenav-routes';

const routes: RouterConfig = [
    {
        path: '',
        component: DashboardComponent
    },
    ...sideNavRoutes
];

export const appRouterProviders = [
  provideRouter(routes)
];