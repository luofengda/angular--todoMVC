/*
 * @Author: luofengda
 * @Date:   2016-12-10 12:11:30
 * @Last Modified by:   luofengda
 * @Last Modified time: 2016-12-10 21:03:00
 */

(function(angular) {
    //因为没有模板，需要我们手动的来创建模板
    //创建控制器
    angular.module('todoApp.Controller', []).controller('TodoController', ['$scope', '$location', 'TodoServer', function($scope, $location, TodoServer) {
        // 任务一：展示列表功能
        // 思路：
        //      创建一个数据列表，然后通过 ng-repeat 指令将数据进行展示
        // $scope.todolist = [
        //     { id: 1, name: '张三', isCompleted: false },
        //     { id: 2, name: '李四', isCompleted: true },
        //     { id: 3, name: 'html', isCompleted: false },
        //     { id: 4, name: 'angular', isCompleted: true }

        // ];  
        $scope.todolist = TodoServer.getData();
        // 任务二：
        // 思路：
        //      获取数据添加到todolist
        $scope.newTask = '';
        $scope.add = function() {
            if (!$scope.newTask) {
                return;
            };
            TodoServer.addData($scope.newTask);
            $scope.newTask = '';
        };
        // 任务三
        //删除一条任务 

        $scope.remove = function(id) {
            TodoServer.removeData(id);
        };
        // 任务四
        // 双击修改列表数据信息
        $scope.updateId = -1;
        $scope.update = function(id) {
            $scope.updateId = id;
        };
        $scope.save = function() {
            $scope.updateId = -1;
            TodoServer.saveData();
        };

        // 任务五 切换总任务状态改变 两种解决方法
        //  1 绑定单击事件
        //  2 使用$watch
        $scope.isCheckeAll = false;
        $scope.selectAll = function() {
          TodoServer.selectAll($scope.isCheckeAll);
        };


        
        // // 优化：同步了单个点击的时候 总按钮的是否被选中的bug  同时 新增了 保存的功能
        $scope.isCheckbox = function() {
           $scope.isCheckeAll=TodoServer.isCheckbox($scope.isCheckeAll);
        }


        // 任务六 Clear completed删除已完成的任务
        // 思路 将状态为true的列表删除，
        //      只需要将未完成的任务取出来，放到temp数组中，最后，再替换todoList
        //      
        $scope.clearCompleted = function() {
           TodoServer.clearCompleted();
            $scope.todolist=TodoServer.getData();
        };
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
        // 任务九：
        //    使用过滤器过滤东西
        //   filter使用过滤器
        //   status对应的是{isCompleted:false}过滤的条件
        $scope.status = {};
        // $scope.checkAll = function() {
        //     $scope.status = {};
        // };
        // $scope.checkActive = function() {
        //     $scope.status = { isCompleted: false };
        // };

        // $scope.checkCompleted = function() {
        //     $scope.status = { isCompleted: true };
        // };
        // 任务十：根据url变化显示相应的任务
        //      思路:使用$watch来监视 location。url
        $scope.location = $location;
        $scope.$watch('location.url()', function(newValue, oldValue) {
            // 因为每次刷新页面的时候，锚点值没有发生变化，
            // 新旧数据都是一样的，所以就直接返回，
            // 并且默认将页面中的内容全部展示
            switch (newValue) {
                case '/':
                    $scope.status = {};
                    break;
                case '/active':
                    $scope.status = { isCompleted: false };
                    break;
                case '/completed':
                    $scope.status = { isCompleted: true };
                    break;
                default:
                    $scope.status = {};
                    break;
            }
        })

    }])
})(angular)
