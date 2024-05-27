import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {CookieGuard} from "./_guard/cookie.guard";
import {HomeComponent} from "./home/home.component";
import {PedidosComponent} from "./pedidos/pedidos.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CookieGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [CookieGuard] },
  { path: 'login',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
