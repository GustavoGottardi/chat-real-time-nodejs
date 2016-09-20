import template from './forgot-password.html';
import controller from './forgot-password.controller';

let forgotPasswordComponent = {
	restrict: 'E',
	scope: {},
	template,
	controller,
	controllerAs: 'ctrl',
	bindToController: true
};

export default forgotPasswordComponent;