'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import AppComponent from './app.component.js';
import Components from './components/components';
import './assets/scss/main.scss';

angular.module('chatApp', [
  uiRouter,
  satellizer,
  Components.name
]).directive('app', AppComponent);