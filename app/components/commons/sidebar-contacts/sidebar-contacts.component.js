import template from './sidebar-contacts.html';
import controller from './sidebar-contacts.controller';

let sidebarContactsComponent = () => {
	return {
		restrict: 'E',
		scope: {},
		template,
		controller,
		controllerAs: 'ctrl',
		bindToController: true
	};
};

export default sidebarContactsComponent;