class LoginController {
	constructor() {
		this.socket = io.connect('http://localhost:3000');
		this.socket.on('toClient', function (msg) {
			document.getElementById('historico').innerHTML += msg;
		});
	}

	enviar(nome,msg){
		console.log(enviar);
		this.socket.emit('toServer', {nome: nome, msg: msg});
	};
}

export default LoginController;