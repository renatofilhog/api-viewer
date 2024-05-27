import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TokenStorageService} from "../token/token-storage.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

/** @title Form field with error messages */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.tokenStorageService = tokenStorageService;
    this.router = router;
    this._snackBar = _snackBar;
  }

  ngOnInit() {
    if (this.tokenStorageService.getTokenFromCookie()) {
      this.router.navigate(['/']);
    }
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (this.password.hasError('required')) {
      return 'Campo obrigatório';
    }

    return '';
  }

  authorizeCredentials() {
    if (this.username.value != null && this.password.value != null) {
      this.tokenStorageService.authorizeCredentials(this.username.value?.toString(), this.password.value?.toString())
        .subscribe((response: any) => {
          this.tokenStorageService.saveTokenToCookie(response);
          this.router.navigate(['/']);
        }, error => {
          this.openSnackBar(error.error.message, 'Fechar', ['error-snackbar']);
          }
        );
    }
  }

  openSnackBar(message: string, action: string, classes: string[]) {
    this._snackBar.open(message, action, {
      panelClass: classes,
    });
  }
}
