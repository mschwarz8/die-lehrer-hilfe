# DieLehrerHilfe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## How to deploy app to GoogleCloudEngine

1. Login to Google Cloud Engine: `gcloud auth login`
2. Check if logged in with correct account `gcloud config list`
3. Change current account with `gcloud config set account [EMAIL_ADRESS]`
4. Change current project with `gcloud config set project [die-lehrer-hilfe]`
5. Create a production build with `ng build --prod`
6. Paste file `app.yaml` to created `dist/` folder
7. Upload app to GAE `gcloud app deploy [--project=die-lehrer-hilfe]`
