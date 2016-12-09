(function(angular) {
    'use strict';
    //创建模块
    var app = angular.module('todoApp', []);
    //创建控制器
    app.controller('TodoController', ['$scope', function($scope) {
        // 任务一：展示列表功能
        // 思路：
        //      创建一个数据列表，然后通过 ng-repeat 指令将数据进行展示
        $scope.todolist = [
            { id: 1, name: '张三', isCompleted: false },
            { id: 2, name: '李四', isCompleted: true },
            { id: 3, name: 'html', isCompleted: false },
            { id: 4, name: 'angular', isCompleted: true }

        ];
        // 任务二：
        // 思路：
        //      获取数据添加到todolist
        $scope.newTask = '';
        $scope.add = function() {
            var id = 0;
            // 将数据添加
            if (!$scope.newTask) {
                return;
            };
            // id解决方法
            // 取出数据中最后一条ID，然后加+1
            if ($scope.todolist.length === 0) {
                id = 1;
            } else {
                id = $scope.todolist[$scope.todolist.length - 1].id + 1;
            }
            $scope.todolist.push({ id: id, name: $scope.newTask, isCompleted: false });
            $scope.newTask = '';
            console.log(id);
        };
        // 任务三
        //删除一条任务 

        $scope.remove = function(id) {
            for (var i = 0; i < $scope.todolist.length; i++) {
                var temp = $scope.todolist[i];
                if (temp.id === id) {
                    $scope.todolist.splice(i, 1);
                    return;
                };
            };
        };
        // 任务四
        // 双击修改列表数据信息
        $scope.updateId = -1;
        $scope.update = function(id) {
            $scope.updateId = id;
        };
        $scope.save = function() {
            $scope.updateId = -1;
        };
        // 任务五 两种解决方法
        //  1 绑定单击事件
        //  2 使用$watch
        $scope.isCheckeAll = false;
        // $scope.$watch("isCheckeAll", function(newValue, oldVlue) {
        //     if (newValue === oldVlue) {
        //         return;
        //     };
        //     for (var i = 0; i < $scope.todolist.length; i++) {
        //         $scope.todolist[i].isCompleted = $scope.isCheckeAll;
        //     };
        // });
        $scope.selectAll = function() {
            console.log($scope.isCheckeAll );
            for (var i = 0; i < $scope.todolist.length; i++) {
                $scope.todolist[i].isCompleted = $scope.isCheckeAll;
            }
        };
        // 优化：同步了单个点击的时候 总按钮的是否被选中的bug
        $scope.isCheckbox=function(){
             for (var i = 0; i < $scope.todolist.length; i++) {
                if ( !$scope.todolist[i].isCompleted) {
                    $scope.isCheckeAll = false;
                    return;
                }
                 if ( $scope.todolist[i].isCompleted) {
                    $scope.isCheckeAll = true;
                }
            }
        }
       

        // 任务六 Clear completed删除已完成的任务
        // 思路 将状态为true的列表删除，
        //      只需要将未完成的任务取出来，放到temp数组中，最后，再替换todoList
        //      
        $scope.clearCompleted = function() {
                var arr = [];
                for (var i = 0; i < $scope.todolist.length; i++) {
                    var temp = $scope.todolist[i];
                    if (temp.isCompleted === false) {
                        arr.push(temp);
                    };
                };
                $scope.todolist = arr;
            },
            // 任务七  Clear completed的显示与隐藏
            $scope.isShow = function() {
                for (var i = 0; i < $scope.todolist.length; i++) {
                    var temp = $scope.todolist[i];
                    if (temp.isCompleted) {
                        return true;
                    };
                };
                return false;
            };
        // 任务八 显示未完成的任务数量
        $scope.getCount = function() {
            var count = 0;
            for (var i = 0; i < $scope.todolist.length; i++) {
                var temp = $scope.todolist[i];
                if (!temp.isCompleted) {
                    count++;
                };
            };
            return count;
        };




    }])

    //将angular传入    
})(angular);
