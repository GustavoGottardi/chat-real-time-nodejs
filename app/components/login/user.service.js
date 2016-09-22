class UserService {
	constructor($http) {
		this.$http = $http;
	}

	getCurrentUser() {
		return this.$http.get('/auth/me').then((response)=>response.data);
	}

}

export default UserService;