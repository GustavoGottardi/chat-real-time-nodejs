import logoImage from '../../../assets/images/logo-chat.png';

class HeaderController {
	constructor($auth, $state, userService) {
		let _this = this;
		this.$auth = $auth;
		this.$state = $state;
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
	}

	logout(){
        this.$auth.logout().then(() => {
            this.$state.go('login', { redirect : true });
            localStorage.removeItem('satellizer_token');
        });
    }

	isAuthenticated() {
		return this.$auth.isAuthenticated();
	}

}

export default HeaderController;