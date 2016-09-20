import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import signupComponent from './signup.component';

let signupModule = angular.module('signup', [
  uiRouter,
  satellizer
])
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('signup', {
		url: '/signup',
		template: '<signup></signup>'
    })
})
.component('signup', signupComponent);

export default signupModule;