class LoginController {
	constructor($rootScope, $auth, $state, userService) {
		this.$rootScope = $rootScope;
		this.$auth = $auth;
		this.$state = $state;
		this.inputTypePassword = 'password';
		this.userService = userService;
		this.currentUser = {};
	}

	login(user) {
		this.$auth.login(user).then((response) => {
			if(response.data.statusLogin === 200) {
				this.$state.go('home', { redirect : true });
				try {
					this.socket = io.connect('http://localhost:3000');
					this.userService.getCurrentUser().then((response) => {
						if(response.statusUser === 200) {
							this.currentUser = response.data;
							this.$rootScope.$emit('currentUser', this.currentUser);
							this.socket.emit('join', {email: this.currentUser.email});
						}
					});
				} catch (e) {
					console.log("Error connect in chat");
					// You really need an error message or this is pointless
				}
			} else if(response.data.statusLogin === 404) {
				alert("Usuário ou senha incorretos!");
			} else if(response.data.statusLogin === 500) {
				alert("Erro ao tentar realizar o login, tente novamente mais tarde!");
			}
		}).catch((error)=>{
			alert("Erro ao tentar realizar o login, tente novamente mais tarde!");
		});
	}

	hideShowPassword() {
        if (this.inputTypePassword == 'password'){
            this.inputTypePassword = 'text';
        } else {
            this.inputTypePassword = 'password';
        }
    }
    
}

export default LoginController;