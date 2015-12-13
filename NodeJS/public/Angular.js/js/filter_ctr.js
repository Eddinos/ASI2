// Bonne pratique!!!

// Créer le controlleur associée au module.
angular.module('filterApp').controller('filterController', filterFunction);

filterFunction.$inject = ['$scope', 'oldService'];

// Utilisation du scope qui marche mais moins bonne pratique!!
function filterFunction ($scope, oldService) {
	// Define the users.
	var user1 = {surname: 'John', lastname: 'Doe', age: 28, login: 'johndoe'};
	var user2 = {surname: 'Paul', lastname: 'Smith', age: 23, login: 'paulsmith'} 
	var user3 = {surname: 'Walter', lastname: 'White', age: 38, login: 'breakingbad'}
	var user4 = {surname: 'Rick', lastname: 'Grimes', age: 33, login: 'thewalkingdead'}
	
	// Create a scope userList holding them.
	$scope.userList = [user1, user2, user3, user4];

	// Create the scope filter string.
	$scope.filter = "";

	$scope.checkOld = function(user) {
		return oldService.oldPerson(user.age);
	};
};
