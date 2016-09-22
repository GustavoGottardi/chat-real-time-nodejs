import template from './header.html';
import controller from './header.controller';

let headerComponent = () => {
	return {
		restrict: 'E',
		scope: {},
		template,
		controller,
		controllerAs: 'ctrl',
		bindToController: true
	};
};

export default headerComponent;