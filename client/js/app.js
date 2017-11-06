var app = angular.module('miAngular', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
        .when('/', {
          templateUrl : 'views/home.html',
          controller  : 'homeCtrl',
        })

        .when('/prueba', {
          templateUrl : 'views/prueba.html',
          controller  : 'pruebaCtrl',
        })

        .otherwise({
          redirectTo: '/'
        });

  /* ESTO LO USAREMOS DESPUES */
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

});
