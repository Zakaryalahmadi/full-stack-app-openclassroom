import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ArticleGateway } from './core/ports/Article.gateway';
import { ArticleApiGateway } from './core/adapters/article-api.gateway';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ArticleGateway,
      useClass: ArticleApiGateway,
    },
  ],
};
