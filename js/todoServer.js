/*
* @Author: luofengda
* @Date:   2016-12-10 12:11:45
* @Last Modified by:   luofengda
* @Last Modified time: 2016-12-10 12:20:19
*/

(function(angular){
	angular.module('todoApp.Server',[]).service('TodoServer', [function(){
			this.test=function(){
				console.log("测试一下服务器里面的方法");
			}
	}])
})(angular)
