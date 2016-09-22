import angular from "angular";
import uiRouter from "angular-ui-router";
import angularI18n from "../node_modules/angular-i18n/angular-locale_pt-br.js";
import AppComponent from './app.component.js';
import HeaderComponent from './components/commons/header/header.component';
import SidebarContactsComponent from './components/commons/sidebar-contacts/sidebar-contacts.component';
import contactsService from './components/commons/sidebar-contacts/sidebar-contacts.service';
import Components from './components/components';
import './assets/scss/main.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

angular.module('chatApp', [
  uiRouter,
  Components.name
]).directive('app', AppComponent)
.directive('headerChat', HeaderComponent)
.directive('sidebarContacts', SidebarContactsComponent)
.service('contactsService', contactsService);