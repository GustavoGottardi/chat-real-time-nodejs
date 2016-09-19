import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import loginComponent from './login.component';
import loginService from './login.service';

let loginModule = angular.module('login', [
  uiRouter,
  satellizer
])
.config(($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $q, $location) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
		url: '/',
		template: '<login></login>'
		// resolve: {
		// 	skipIfLoggedIn: skipIfLoggedIn
		// }
    })

    var loginRequired = function($q, $location, $auth) {
		let deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}

	var skipIfLoggedIn = function($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
			$state.go('/deputados', { redirect: true });
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}
})
.component('login', loginComponent)
.service('loginService', loginService);

export default loginModule;