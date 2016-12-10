/*
 * @Author: luofengda
 * @Date:   2016-12-10 12:11:45
 * @Last Modified by:   luofengda
 * @Last Modified time: 2016-12-10 21:02:50
 */

(function(angular) {
    // 模型中的 function 是构造函数
    angular.module('todoApp.Server', []).service('TodoServer', ['$window', function($window) {
        // this.test=function(){
        //  console.log("测试一下服务器里面的方法");
        // }
        // ng没有提供localStorage ，通过$window这个服务获取
        var storage = $window.localStorage;
        // 获取本地存储的数据
        var dataStr = storage.getItem('todo');
        // 保证以数组的形式输出
        var todolist = JSON.parse(dataStr || []);
        // 暴露数据 用来获取数据的方法
        // 
        // 保存传入的数据信息
        this.saveData = function() {
            storage.setItem('todo', JSON.stringify(todolist));
        };



        // 暴露数据 用来获取数据的方法
        //查询数据的方法
        this.getData = function() {
            return todolist;
        };


        // 新增数据的方法
        this.addData = function(newTask) {
            var id = 0;
            // 将数据添加
            // id解决方法
            // 取出数据中最后一条ID，然后加+1
            if (todolist.length === 0) {
                id = 1;
            } else {
                id = todolist[todolist.length - 1].id + 1;
            }
            todolist.push({ id: id, name: newTask, isCompleted: false });
            this.saveData();
        };



        // 删除数据的方法
        this.removeData = function(id) {
            for (var i = 0; i < todolist.length; i++) {
                var temp = todolist[i];
                if (temp.id === id) {
                    todolist.splice(i, 1);
                    //在函数结束之前，先保存数据
                    this.saveData();
                    return;
                };
            };
        };



        // 切换总按钮点击切换的状态
        this.selectAll = function(isCheckeAll) {
            for (var i = 0; i < todolist.length; i++) {
                todolist[i].isCompleted = isCheckeAll;
            }
            this.saveData();
        };
        // 同步了单个点击的时候 总按钮的是否被选中的bug  同时 新增了 保存的功能
        this.isCheckbox=function(isCheckeAll){
            // var  isCheckeAll=false;
             for (var i = 0; i < todolist.length; i++) {
                if (!todolist[i].isCompleted) {
                    isCheckeAll = false;
                    this.saveData();
                }
            }
             return isCheckeAll;
        }

        // Clear completed删除已完成的任务
        this.clearCompleted=function(){
             var arr = [];
            for (var i = 0; i < todolist.length; i++) {
                var temp = todolist[i];
                if (temp.isCompleted === false) {
                    arr.push(temp);
                };
            };
            todolist = arr;
            this.saveData();
        }



    }])
})(angular)
