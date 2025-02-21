import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ArticleGateway } from './core/ports/article.gateway';
import { ArticleApiGateway } from './core/adapters/article-api.gateway';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './core/ports/auth/authentication.service';
import { AuthenticationServiceImpl } from './core/adapters/auth/authentication.service';
import { RouteService } from './shared/services/route.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ArticleGateway,
      useClass: ArticleApiGateway,
    },
    {
      provide: AuthenticationService,
      useClass: AuthenticationServiceImpl,
    },
  ],
};
