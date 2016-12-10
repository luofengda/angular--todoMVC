/*
* @Author: luofengda
* @Date:   2016-12-10 12:11:45
* @Last Modified by:   luofengda
* @Last Modified time: 2016-12-10 15:13:40
*/

(function(angular){
	// 模型中的 function 是构造函数
	angular.module('todoApp.Server',[]).service('TodoServer', ['$window',function($window){
			// this.test=function(){
			// 	console.log("测试一下服务器里面的方法");
			// }
			// ng没有提供localStorage ，通过$window这个服务获取
			var storage=$window.localStorage;
			// 获取本地存储的数据
			var dataStr=storage.getItem('todo');
			// 保证以数组的形式输出
			var todolist=JSON.parse(dataStr||[]);
			// 暴露数据 用来获取数据的方法
			this.getData=function(){
				return todolist;
			};


			
	}])
})(angular)
