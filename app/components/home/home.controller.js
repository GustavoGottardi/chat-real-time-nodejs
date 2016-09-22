class HomeController {
	constructor(userService,homeService) {
		let _this = this;
		this.socket = io.connect('http://localhost:3000');
		this.socket.on('toClient', function (msg) {
			document.getElementById('historico').innerHTML += msg;
		});
		this.userService = userService;
		this.homeService = homeService;
		this.currentUser = {};
		this.allUsers = {};
		this.userService.getCurrentUser().then((response) => {
			if(response.statusUser === 200) {
				this.currentUser.name = response.data.name;
				this.currentUser.email = response.data.email;
				this.currentUser.token = response.data.token;
			}
		});

	}

	enviar(msg){
		let user_name = this.currentUser.name;
		this.socket.emit('toServer', {name: user_name, msg: msg});
	}
}

export default HomeController;