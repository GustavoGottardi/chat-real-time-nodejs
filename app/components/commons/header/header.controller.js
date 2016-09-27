import logoImage from '../../../assets/images/logo-chat.png';

class HeaderController {
	constructor($rootScope, $auth, $state, userService, contactsService) {
		let _this = this;
		this.socket = io.connect('http://localhost:3000');
		this.$rootScope = $rootScope;
		this.$auth = $auth;
		this.$state = $state;
		this.contactsService = contactsService;
		this.userService = userService;
		this.logoImage = logoImage;
		this.currentUser = {};

		this.userService.getCurrentUser().then((response) => {
			if(response.statusUser === 200) {
				this.currentUser.name = response.data.name;
				this.currentUser.email = response.data.email;
				this.currentUser.token = response.data.token;
			}
		});

		this.$rootScope.$on('currentUser', (event,response) => {
			this.currentUser = response;
		});
	}

	logout(){
        // this.$rootScope.$emit('notifyStatus', {email: this.currentUser.email, status: 'offline'});
        this.socket.emit('user logout', this.currentUser);
        this.$auth.logout().then(() => {
            localStorage.removeItem('satellizer_token');
            this.$state.go('login', { redirect : true });
        });
    }

	isAuthenticated() {
		return this.$auth.isAuthenticated();
	}

}

export default HeaderController;