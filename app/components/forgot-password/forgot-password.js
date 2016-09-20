import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import forgotPasswordComponent from './forgot-password.component';

let forgotPasswordModule = angular.module('forgotPassword', [
  uiRouter,
  satellizer
])
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('forgot-password', {
		url: '/forgot-password',
		template: '<forgotPassword></forgotPassword>'
    })
})
.component('forgotPassword', forgotPasswordComponent);

export default forgotPasswordModule;