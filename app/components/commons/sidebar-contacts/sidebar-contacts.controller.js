class SidebarContactsController {
	constructor($rootScope, $auth, $state, contactsService) {
		let _this = this;
		this.$rootScope = $rootScope;
		this.socket = io.connect('http://localhost:3000');
		this.$auth = $auth;
		this.$state = $state;
		this.contactsService = contactsService;
		this.allUsers = {};

		this.getAllUsers();
		this.updateAllUsers();

		this.$rootScope.$on('allUsers',(event,response) => {
			this.allUsers = response;
		});

		this.socket.on('notifyStatus',(response,event) => {
			for(let i=0; i < this.allUsers.length; i++) {
				if(this.allUsers[i].email == response.email) {
					this.allUsers[i].statusNotify = response.status;
					this.contactsService.updateStatusNotify(this.allUsers[i]).then((response) => {});
				}
			}
		});

		this.$rootScope.$on('notifyStatus', (event,response) => {
			for(let i=0; i < this.allUsers.length; i++) {
				if(this.allUsers[i].email == response.email) {
					this.allUsers[i].statusNotify = response.status;
					this.contactsService.updateStatusNotify(this.allUsers[i]).then((response) => {
						if(response.status === 200){
							this.updateAllUsers();
						}
					});
				}
			}
		});
	}

	selectUser(token) {
		this.$rootScope.$emit('selectUser', token);
	}

	getAllUsers() {
		this.contactsService.getAllUsers().then((response) => {
			if(response.status === 200) {
				this.allUsers = response.data;
			}
		});
	}

	updateAllUsers() {
		this.contactsService.getAllUsers().then((response) => {
			if(response.status === 200) {
				this.$rootScope.$emit('allUsers', this.allUsers);
			}
		});
	}

	isAuthenticated() {
		return this.$auth.isAuthenticated();
	}

}

export default SidebarContactsController;