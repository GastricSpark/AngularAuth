/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);

    function authConfig($httpProvider){
        $httpProvider.interceptors.push('authInterceptor');
    }
}());