// NOT GOOD PRACTICE

var app = angular.module('sampleApp',[]);

app.controller('sampleCtrl', function() {
	this.addView = function() {
		this.user.view++;
	};
	this.user = {
		name: {
			lastname: 'Doe',
			surname: 'John'
		}, 
		age: 25,
		view: 0 
	};
});
