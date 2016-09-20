import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import homeComponent from './home.component';
import homeService from './home.service';

let toResolve = {
	'loginRequired': function($q, $state, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$state.go('login');
		}
		return deferred.promise;
	}
};

let homeModule = angular.module('home', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
		url: '/home',
		template: '<home></home>',
		resolve: toResolve
    });
})
.component('home', homeComponent)
.service('homeService', homeService);

export default homeModule;