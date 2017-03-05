'use strict';

/**
 * @ngdoc function
 * @name morewithlessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the morewithlessApp
 */
angular.module('morewithlessApp')
.controller('MainCtrl', function ($location,$scope, $mdDialog, $rootScope,campaign,user,authentification) {
  
  $scope.campaigns = []
  $scope.campaigns = campaign.getAllCampaigns()
  $scope.users = []
  $scope.users = user.getAllusers()
  
  authentification.verifyCredentials()
  $scope.showLoginDialog = function(ev){
    $mdDialog.show({
      controller: "LoginDialogController",
      templateUrl: 'views/logindialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".'
      console.log($scope.status)
    }, function() {
      $scope.status = 'You cancelled the dialog.'
      console.log($scope.status)
    });
  }
  $scope.logout = function(){
    authentification.clearCredentials()
  }

  $scope.goToProfile = function(){
    user.getByUsername($rootScope.globals.currentUser.username).then(
      function(data){
        console.log("data %O",data)
        if(data.isCompany){
          console.log('im a company, jump to company view')
          $location.path( "/company" );
        }
        if(!data.isAuthorized) return
        console.log('im not a company, jump to worker view')
        $location.path( "/worker" );
      },
      function(err){
        console.error("error is %O",err)
      }
    )
  }

})
.controller('LoginDialogController', function ($scope, $mdDialog, authentification) {
  $scope.cancel = function(){
    $mdDialog.hide();
  }
  $scope.login = function(username,password){
    console.log("trying to login")
    $scope.loginusername = username
    $scope.loginpassword = password
    authentification.login(username,password, loginResult)
  }
  function loginResult(data){
    if(data.success){
      authentification.setCredentials($scope.loginusername,$scope.loginpassword)
      $mdDialog.hide("login");
    }else{
      authentification.clearCredentials()
      $scope.status = data.message
    }
  }
})
