import angular from 'angular';
import Home from './home/home';
import Login from './login/login';
import forgotPassword from './forgot-password/forgot-password';
import signup from './signup/signup';

export default angular.module('app.components', [
  Home.name,
  Login.name,
  forgotPassword.name,
  signup.name
]);