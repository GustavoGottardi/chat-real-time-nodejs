import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import loginComponent from './login.component';
import userService from './user.service';

let toResolve = {
	'skipIfLoggedIn': function($q, $state, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			$state.go('home', { redirect: true });
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}
};

let loginModule = angular.module('login', [
  uiRouter,
  satellizer
])
.config(($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
		url: '/',
		template: '<login></login>',
		resolve: toResolve
    });

    $authProvider.httpInterceptor = function() {
		return true;
	};

	let current_url = location.href;

	$authProvider.withCredentials = true;
	$authProvider.tokenRoot = null;
	$authProvider.cordova = false;
	$authProvider.baseUrl = current_url;
	$authProvider.loginUrl = '/auth/authenticate';
	$authProvider.signupUrl = '/auth/signup';
	$authProvider.tokenName = 'token';
	$authProvider.tokenPrefix = 'satellizer';
	$authProvider.authHeader = 'Authorization';
	$authProvider.authToken = 'Bearer';
	$authProvider.storageType = 'localStorage';
})
.component('login', loginComponent)
.service('userService', userService);

export default loginModule;