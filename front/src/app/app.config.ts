import { ToastBarService } from './shared/services/toast-bar.service';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { ArticleApiGateway } from './core/adapters/article/article-api.gateway';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthenticationService } from './core/ports/auth/authentication.service';
import { AuthenticationServiceImpl } from './core/adapters/auth/authentication.service';
import { RouteService } from './shared/services/route.service';
import { ArticleGateway } from './core/ports/article/article.gateway';
import { TopicApiGateway } from './core/adapters/topic/topic-api.gateway';
import { TopicGateway } from './core/ports/topic/topic.gateway';
import { TokenService } from './core/adapters/auth/token.service';
import { catchError, tap, throwError } from 'rxjs';
import { UserGateway } from './core/ports/user/user.gateway';
import { UserApi } from './core/adapters/user/user-api.gateway';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (token) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
};

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastBarService = inject(ToastBarService);
  const authenticationService = inject(AuthenticationService);
  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      switch (httpError.status) {
        case 401:
          authenticationService.logout();
          break;
        case 400:
          toastBarService.openErrorSnackBar(
            httpError.error?.message || 'error'
          );
      }
      return throwError(() => httpError);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, httpErrorInterceptor])
    ),
    {
      provide: ArticleGateway,
      useClass: ArticleApiGateway,
    },
    {
      provide: AuthenticationService,
      useClass: AuthenticationServiceImpl,
    },
    {
      provide: TopicGateway,
      useClass: TopicApiGateway,
    },
    {
      provide: UserGateway,
      useClass: UserApi,
    },
  ],
};
