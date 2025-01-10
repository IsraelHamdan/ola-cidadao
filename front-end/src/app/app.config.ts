import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
            provideRouter(routes),
            provideAuth0({

              domain: 'dev-7fvb7yro48pcduqm.us.auth0.com',
             
              clientId: 'kvl1SUPDHecS1lmapVZgqsy7DRtbj4lb',
             
              authorizationParams: {
             
              redirect_uri: window.location.origin,
             
              },
              cacheLocation: 'localstorage', // Armazena os tokens no localStorage
              useRefreshTokens: true, // Permite renovar os tokens automaticamente
             
              }),
          ]
};
