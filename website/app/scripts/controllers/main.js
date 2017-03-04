'use strict';

/**
 * @ngdoc function
 * @name morewithlessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the morewithlessApp
 */
angular.module('morewithlessApp')
  .controller('MainCtrl', function ($scope) {
    
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
