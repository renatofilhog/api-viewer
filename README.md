# MagentoView

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.0. Node version 18.16.1

## Installing project
Run `npm install` to install all the dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Certificates

Certifique-se de ter instalado a ferramenta da openssl. Rode os dois comandos a seguir para gerar os certificados SSL
```
openssl genpkey -algorithm RSA -out certs/key.pem -pkeyopt rsa_keygen_bits:2048
openssl req -new -x509 -key key.pem -out certs/cert.pem -days 365 -subj "/C=BR/ST=State/L=City/O=Organization/CN=localhost"
```
