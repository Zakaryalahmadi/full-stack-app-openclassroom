import { computed, inject, Injectable, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly router = inject(Router);

  private readonly loginAndRegisterRoutes = ['/login', '/register'];

  getCurrentRoute$(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((navigationEnd) => navigationEnd.url),
      startWith(this.router.url)
    );
  }

  isLoginOrRegister(): Signal<boolean | undefined> {
    return toSignal(
      this.getCurrentRoute$().pipe(
        tap((url) => console.log(url)),
        map((url) => this.loginAndRegisterRoutes.includes(url))
      )
    );
  }
}
