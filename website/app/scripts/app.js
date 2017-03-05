'use strict';

/**
 * @ngdoc overview
 * @name morewithlessApp
 * @description
 * # morewithlessApp
 *
 * Main module of the application.
 */
angular
  .module('morewithlessApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
  ])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('indigo');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/company', {
        templateUrl: 'views/company.html',
        controller: 'CompanyCtrl',
        controllerAs: 'company'
      })
      .when('/worker', {
        templateUrl: 'views/worker.html',
        controller: 'WorkerCtrl',
        controllerAs: 'worker'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
