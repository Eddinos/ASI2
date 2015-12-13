a// NOT GOOD PRACTICE

var app = angular.module('sampleApp',[]);

app.controller('controller1', ['$scope', function($scope) {
	$scope.addView = function() {
		$scope.user.view ++;
	};
	$scope.user = {surname: 'John', lastname:'Doe', age:25, view:0};
}]);

app.controller('controller2', ['$scope', function($scope) {
	$scope.user.registered = true;
}]);