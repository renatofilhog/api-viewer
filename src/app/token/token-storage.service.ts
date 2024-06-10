import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

const TOKEN_KEY = 'authToken';
const EXP_TOKEN_DATE = 'expDate';
const EXP_TOKEN_TIME = 4 * 3600 * 1000;
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

  public static saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EXP_TOKEN_DATE);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(EXP_TOKEN_DATE, (new Date().getTime() + EXP_TOKEN_TIME).toString());
  }

  public static getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    const expDate = window.sessionStorage.getItem(EXP_TOKEN_DATE);
    if (token && expDate) {
      if (new Date().getTime() < parseInt(expDate)) {
        return token;
      } else {
        window.sessionStorage.clear();
      }
    }
    return null;
  }

  public static logout(): void {
    window.sessionStorage.clear();
  }

}
