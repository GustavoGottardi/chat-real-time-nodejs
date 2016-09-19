import angular from 'angular';
import Home from './home/home';
import Login from './login/login';

export default angular.module('app.components', [
  Home.name,
  Login.name
]);