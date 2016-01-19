/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('LoginController', loginController);

    loginController.$inject = ['user', '$location'];

    function loginController(user, $location){
        var vm = this;
        vm.login = function(){
            user.login(vm.email, vm.password);
        };

    }
}());