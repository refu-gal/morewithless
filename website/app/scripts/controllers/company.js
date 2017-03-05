'use strict';

/**
 * @ngdoc function
 * @name morewithlessApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the morewithlessApp 
 */
angular.module('morewithlessApp')
.controller('CompanyCtrl', function ($scope, $filter, $mdToast, $location, $rootScope, user, campaign) {
  $scope.updateUser = function(userData){
    userData.isAuthorized = !userData.isAuthorized
    if(userData.isAuthorized)
      $scope.currentUser.quantity = +$scope.currentUser.quantity + +userData.quantity
    else
      $scope.currentUser.quantity = +$scope.currentUser.quantity - +userData.quantity
    user.updateUser(userData).then(
      function(response){
        console.log("Update ok!! %O", response)
      },function(error){
        console.error("something went wrong when updating! %O", error)
      }
    )
  }
  function refreshUserInfo(){
    user.getFullCompanyByName($rootScope.globals.currentUser.username).then(
      function(data){
        $scope.currentUser = data
        if(!data.isCompany){
          $location.path( "/" );
          $mdToast.show(
            $mdToast.simple()
              .textContent('No eres una empresa!!')
              .position("botom")
              .hideDelay(3000)
          )
        }
      },
      function(err){
        console.error("error! %O",err)
      }
    )  
  }
  refreshUserInfo()
});
