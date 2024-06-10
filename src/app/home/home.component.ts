import { Component } from '@angular/core';
import {TokenStorageService} from "../token/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  logout() {
    TokenStorageService.logout();
    window.location.reload();
  }

  pedidos() {
    this.router.navigate(['/pedidos']);
  }
}
