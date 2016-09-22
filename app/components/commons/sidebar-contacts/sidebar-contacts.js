import angular from "angular";
import SidebarContactsComponent from './sidebar-contacts.component';

angular.module('chatApp', [
  uiRouter
])
.directive('sidebarContacts', SidebarContactsComponent);