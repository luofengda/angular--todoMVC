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
			{id:4,name:'angular',isCompleted:true}
		
		];
		// 任务二：
		// 思路：
		// 		获取数据添加到todolist
		$scope.newTask='';
		$scope.add=function(){
			var id=0;
			// 将数据添加
			if (!$scope.newTask) {
				return;
			};
			// id解决方法
			// 取出数据中最后一条ID，然后加+1
			if ($scope.todolist.length===0) {
				id=1;
			}else {
				id=$scope.todolist[$scope.todolist.length-1].id+1;
			}
			$scope.todolist.push({id:id,name:$scope.newTask,isCompleted:false});
			$scope.newTask='';
			console.log(id);
		}
	}])

//将angular传入	
})(angular);
