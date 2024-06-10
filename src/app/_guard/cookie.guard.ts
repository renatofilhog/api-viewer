import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {TokenStorageService} from "../token/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CookieGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {
    this.router = router;
    this.cookieService = cookieService;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const tokenExists = TokenStorageService.getToken();

    if (tokenExists) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
