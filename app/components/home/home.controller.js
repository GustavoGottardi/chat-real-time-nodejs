class HomeController {
	constructor($rootScope, userService, homeService) {
		let _this = this;
		this.$rootScope = $rootScope;
		let current_url = location.host;
		this.socket = io.connect(current_url);
		this.userService = userService;
		this.homeService = homeService;
		this.currentUser = {};
		this.userMessage = {};
		this.allUsers = {};
		this.conversations = [];
		this.selectUserCheck = false;
		this.userMessage.name = 'Início';
		
		this.userService.getCurrentUser().then((response) => {
			if(response.statusUser === 200) {
				this.currentUser = response.data;
				this.currentUser.user_name = this.currentUser.name.split(' ').join('');
			}
		});


		this.socket.on('toClient', function (data) {
			let classStyleMessage = false;
			if(data.email == _this.currentUser.email){
				classStyleMessage = "currentUser";
			}
			document.getElementById('historico').innerHTML += '<div class="message-individual '+classStyleMessage+'"><div class="bubble bubble-text"><span class="user_name">'+data.name+': </span><span class="user_message">'+data.message+'</span></div></div>';
		});

		this.$rootScope.$on('allUsers',(event,response) => {
			this.allUsers = response;
		});

		this.$rootScope.$on('selectUser',(event,response) => {
			this.selectUserCheck = true;
			this.userMessageEmail = response;
			this.userMessage = this.findUserByEmail(this.userMessageEmail);
			this.socket.emit('initiate private message', {name: this.userMessage.name, email: this.userMessage.email, currentUserName: this.currentUser.name, currentUserEmail: this.currentUser.email});
		});

		this.socket.on('private room created',(response,event) => {
			this.conversations[response] = {};
		});

		this.socket.on('private chat created',(response,event) => {
			console.log(response);
		});
	}

	enviar(msg){
		this.socket.emit('toServer', {name: this.currentUser.name, message: msg, email: this.currentUser.email});
		document.getElementById("msg").value = "";
	}

	findUserByEmail(email) {
		let allUsers = this.allUsers;
		for(let i=0; i < allUsers.length; i++){
			if(allUsers[i].email == email){
				return allUsers[i];
			}
		}
	}

	updateUserSocketByEmail(email,socket) {
		let allUsers = this.allUsers;
		for(let i=0; i < allUsers.length; i++){
			if(allUsers[i].email == email){
				allUsers[i].socketID = socket;
			}
		}
	}
}

export default HomeController;