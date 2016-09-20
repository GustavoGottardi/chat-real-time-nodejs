class LoginController {
	constructor($auth, $state) {
		this.$auth = $auth;
		this.$state = $state;
		this.inputTypePassword = 'password';
	}

	login(user) {
		this.$auth.login(user).then((response) => {
			if(response.data.statusLogin === 200) {
				this.$state.go('home', { redirect : true });
			} else if(response.data.statusLogin === 404) {
				alert("Usuário ou senha incorretos!");
			} else if(response.data.statusLogin === 500) {
				alert("Erro ao tentar realizar o login, tente novamente mais tarde!");
			}
		}).catch((error)=>{
			alert("Erro ao tentar realizar o login, tente novamente mais tarde!");
		});
	};

	hideShowPassword() {
        if (this.inputTypePassword == 'password'){
            this.inputTypePassword = 'text';
        } else {
            this.inputTypePassword = 'password';
        }
    };
}

export default LoginController;