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

		this.socket.on('notifyStatusAndSocket',(response,event) => {
			for(let i=0; i < this.allUsers.length; i++) {
				if(this.allUsers[i].email == response.email) {
					this.allUsers[i].statusNotify = response.status;
					this.allUsers[i].socketID = response.socketID;
					this.contactsService.updateStatusNotifyAndSocketID(this.allUsers[i]).then((response) => {});
				}
			}
		});

		this.$rootScope.$on('notifyStatusAndSocket', (event,response) => {
			for(let i=0; i < this.allUsers.length; i++) {
				if(this.allUsers[i].email == response.email) {
					this.allUsers[i].statusNotify = response.status;
					this.allUsers[i].socketID = response.socketID;
					this.contactsService.updateStatusNotifyAndSocketID(this.allUsers[i]).then((response) => {
						if(response.status === 200){
							this.updateAllUsers();
						}
					});
				}
			}
		});
	}

	selectUser(email) {
		this.$rootScope.$emit('selectUser', email);
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