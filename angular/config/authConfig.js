/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);


    function authConfig($httpProvider){
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.interceptors.push('authInterceptor');
    }
}());