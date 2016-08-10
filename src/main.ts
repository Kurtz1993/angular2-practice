import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_PIPES } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { CapitalizePipe } from './app/pipes/capitalize.pipe';
import { TruncatePipe } from './app/pipes/truncate.pipe';

if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent, [
  provide(PLATFORM_PIPES, {
    useValue: [
      CapitalizePipe,
      TruncatePipe
    ],
    multi: true
  }),
  appRouterProviders
]);