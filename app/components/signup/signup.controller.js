class signupController {
	constructor($auth, $state, $scope) {
		this.$auth = $auth;
		this.$state = $state;
		this.$scope = $scope;
		this.inputTypePassword = 'password';
	}

	signup(user) {
		this.$auth.signup(user).then((response) => {
			if(response.data.statusSignup === 200) {
				this.$state.go('login', { redirect : true });
				alert("Cadastro realizado com sucesso, faça seu login abaixo!");
			} else if(response.data.statusSignup === 404) {
				alert("Usuário já existe!");
			} else if(response.data.statusSignup === 500) {
				alert("Erro ao tentar realizar o seu cadastro, tente novamente mais tarde!");
			}
		}).catch((error) => {
			alert("Erro ao tentar realizar o seu cadastro, tente novamente mais tarde!");
		});
	}

	comparePassword(password,confirm) {
        if (password === confirm) {
            this.$scope.passwordConfirm=true;
        } else {
            this.$scope.passwordConfirm=false;
        }
    }

    hideShowPassword(){
        if (this.$scope.inputTypePassword == 'password'){
            this.$scope.inputTypePassword = 'text';
        } else{
            this.$scope.inputTypePassword = 'password';
        }
    }
}

export default signupController;