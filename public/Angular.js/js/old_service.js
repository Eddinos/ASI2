angular.module('filterApp').service('oldService', oldFunction);
oldFunction.$inject = ['$log'];

function oldFunction($log) {
	var service = {};

	service.oldPerson = function(age) {
		if (age > 30) {
			return true;
		} else {
			return false;
		}
	};

	service.logInfo = function (msg) {
		$log.warnt("AUTO generated: " + msg);
	}

	return service;
}