import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import loginComponent from './login.component';
import loginService from './login.service';

let loginModule = angular.module('login', [
  uiRouter,
  satellizer
])
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
		url: '/login',
		template: '<login></login>'
    })
})
.component('login', loginComponent)
.service('loginService', loginService);

export default loginModule;