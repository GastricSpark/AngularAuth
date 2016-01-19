/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('RegisterController', registerController);

    registerController.$inject = ['user','$location'];

    function registerController(user, $location){
        var vm = this;

        vm.register = function(){
            user.register(vm.name, vm.email, vm.password, vm.role);
        };
    }
}());