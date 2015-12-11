angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth'];

function loginCrtFnt($scope, $log, auth)
{
	$scope.logAuth = function() 
	{
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);
	};

	this.logAuthObject=function(user)
	{
		$log.info('user login: ', user.login);
		$log.info('user pwd: ', user.pwd);
	};

	this.userList = function()
	{
		var patata = auth.userList();
		$log.info(patata);
	}
}