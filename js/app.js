(function (angular) {
	'use strict';
	//创建模块
	var app= angular.module('todoApp',[]);
	//创建控制器
	app.controller('TodoController', ['$scope', function($scope){
		// 任务一：展示列表功能
		// 思路：
		// 		创建一个数据列表，然后通过 ng-repeat 指令将数据进行展示
		$scope.todolist=[
			{id:1,name:'张三',isCompleted:false},
			{id:2,name:'李四',isCompleted:true},
			{id:3,name:'html',isCompleted:false},
			{id:4,name:'angular',isCompleted:true},
			{id:5,name:'vue',isCompleted:false}
		];

	}])

//将angular传入	
})(angular);
