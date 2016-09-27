class HomeController {
	constructor($rootScope, userService, homeService) {
		let _this = this;
		this.$rootScope = $rootScope;
		this.socket = io.connect('http://localhost:3000');
		this.socket.on('toClient', function (msg) {
			document.getElementById('historico').innerHTML += msg;
		});
		this.userService = userService;
		this.homeService = homeService;
		this.currentUser = {};
		this.userMessage = {};
		this.allUsers = {};

		this.userService.getCurrentUser().then((response) => {
			if(response.statusUser === 200) {
				this.currentUser.name = response.data.name;
				this.currentUser.email = response.data.email;
				this.currentUser.token = response.data.token;
			}
		});

		this.$rootScope.$on('allUsers',(event,response) => {
			this.allUsers = response;
		});

		this.$rootScope.$on('selectUser',(event,response) => {
			this.userMessageToken = response;
			this.userMessage = this.findUserByToken(this.userMessageToken);
			this.socket.emit('initiate private message', {name: this.userMessage.name, email: this.userMessage.email});
		});

		this.$rootScope.$on('private room created',(event,response) => {
			console.log(response);
		});

		this.$rootScope.$on('private chat created',(event,response) => {
			console.log(response);
		});
	}

	enviar(msg){
		let user_name = this.currentUser.name;
		this.socket.emit('send private message', {name: user_name, msg: msg});
	}

	findUserByToken(token) {
		let allUsers = this.allUsers;
		for(let i=0; i < allUsers.length; i++){
			if(allUsers[i].token == token){
				return allUsers[i];
			}
		}
	}
}

export default HomeController;