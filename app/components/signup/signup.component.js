import template from './signup.html';
import controller from './signup.controller';

let signupComponent = {
	restrict: 'E',
	scope: {},
	template,
	controller,
	controllerAs: 'ctrl',
	bindToController: true
};

export default signupComponent;