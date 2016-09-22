import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import signupComponent from './signup.component';

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
		template: '<signup></signup>',
		resolve: toResolve
    });
})
.component('signup', signupComponent);

export default signupModule;