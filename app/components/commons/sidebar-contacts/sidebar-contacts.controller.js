class SidebarContactsController {
	constructor($auth, $state, contactsService) {
		let _this = this;
		this.$auth = $auth;
		this.$state = $state;
		this.contactsService = contactsService;

		this.contactsService.getAllUsers().then((response) => {
			if(response.status === 200) {
				this.allUsers = response.data;
			}
		});
	}

	isAuthenticated() {
		return this.$auth.isAuthenticated();
	}

}

export default SidebarContactsController;