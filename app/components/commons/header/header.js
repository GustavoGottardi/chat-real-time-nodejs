import angular from "angular";
import HeaderComponent from './header.component.js';

angular.module('chatApp', [
  uiRouter
]).directive('headerChat', HeaderComponent);