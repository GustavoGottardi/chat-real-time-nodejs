class ContactsService {
	constructor($http) {
		this.$http = $http;
	}
	
	getAllUsers() {
		return this.$http.get('/auth/allUsers').then((response)=>response.data);
	}

	updateStatusNotifyAndSocketID(user) {
		return this.$http.put('/user/updateStatusNotify', user).then((response)=>response.data);
	}
}

export default ContactsService;
