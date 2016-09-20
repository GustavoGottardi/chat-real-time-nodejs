'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularI18n from '../node_modules/angular-i18n/angular-locale_pt-br.js';
import satellizer from 'satellizer';
import AppComponent from './app.component.js';
import Components from './components/components';
import './assets/scss/main.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

angular.module('chatApp', [
  uiRouter,
  satellizer,
  Components.name
]).directive('app', AppComponent);