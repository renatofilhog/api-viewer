import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private baseUri = '/magento/';
  private method = 'rest/all/V1/integration/admin/token';
  private http: HttpClient;
  public cookieService: CookieService

  constructor(
    http: HttpClient,
    cookieService: CookieService
  ) {
    this.http = http;
    this.cookieService = cookieService;
  }


  authorizeCredentials(username: string, password: string) {
    return this.http.post(this.baseUri + this.method, { username, password });
  }

  saveTokenToCookie(token: string): void {
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 4);
    this.cookieService.set('authToken', token, expireDate, '/');
  }

  getTokenFromCookie(): string {
    return this.cookieService.get('authToken');
  }

  resetTokenFromCookie(): void {
    this.cookieService.delete('authToken', '/');
  }

}
