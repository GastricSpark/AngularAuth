/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['auth'];

    function dashboardController(auth){
        var vm = this;


        vm.logout = function(){
            auth.logout && auth.logout()
        };

        vm.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }

    }
}());