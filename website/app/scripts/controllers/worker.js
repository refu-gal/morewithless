'use strict';

/**
 * @ngdoc function
 * @name morewithlessApp.controller:WorkerCtrl
 * @description
 * # WorkerCtrl
 * Controller of the morewithlessApp
 */
angular.module('morewithlessApp')
.controller('WorkerCtrl', function ($scope, $filter, $mdToast, $location, $rootScope, user, campaign) {
  $scope.firstRefresh = true
  $scope.campaigns = []
  $scope.currentUser = {}
  $scope.contributionOptions = [
    {
      quantity:1,
      equivalent:"Café",
      icon: "fa-coffee",
      msg: "costear material escolar y libros para un colegio de un niño"
    },
    {
      quantity:3,
      equivalent:"Cerveza",
      icon: " fa-beer",
      msg: "costear gastos de actividades extraescolares y campamentos de verano para menores"
    },
    {
      quantity:5,
      equivalent:"Copa",
      icon: "fa-glass",
      msg: "pagar cursos de formación y fomento de autoempleo de un refugiado"
    }
  ]
  
  $scope.selectedContribution = function() {
    if($scope.currentUser.quantity){
      var contrib = $filter('filter')($scope.contributionOptions, { quantity: $scope.currentUser.quantity })
      if(contrib && contrib.length > 0){
        return contrib[0].msg
      }else{
        console.log(contrib)
      }
    }
  }
  
  $scope.$watch('campaigns', function (newVal, oldVal) {
    if(oldVal === undefined) return;
    if(!isArray(oldVal)) return;
    if(Object.keys(oldVal).length === 0 && oldVal.constructor === Object) return;
    if($scope.firstRefresh){
      $scope.firstRefresh = false
      console.log('now changing to firstRefresh %O',$scope.firstRefresh)
      return;
    }

    var newCampaigns = []
    for(var i = 0; i < newVal.length ; i++){
      if(newVal[i].selected)
        newCampaigns.push(newVal[i].id)
    }
    $scope.currentUser.campaigns = newCampaigns
  },true);

  $scope.$watch('currentUser', function (newVal, oldVal) {
    if(Object.keys(oldVal).length === 0 && oldVal.constructor === Object) return;
    if(typeof(oldVal.company) == "string") return;
    
    console.log("user changed %O => %O", oldVal, newVal)
    updateUser()
  }, true);

  function isArray(object){
    return Object.prototype.toString.call( object ) === '[object Array]'
  }

  function isSelectedCampaign(campaign){
    if($scope.currentUser.campaigns){
      var campaignId = campaign.id
      campaign.selected = $scope.currentUser.campaigns.indexOf(campaignId)!=-1?true:false
    }
    return campaign
  }

  function refreshUserInfo(){
    user.getFullUserByName($rootScope.globals.currentUser.username).then(
      function(data){
        $scope.currentUser = data
        if(!data.isAuthorized){
          $location.path( "/" );
          $mdToast.show(
            $mdToast.simple()
              .textContent('A la espera de que tu empresa te autorice!')
              .position("botom")
              .hideDelay(3000)
          )
        }
        $scope.campaigns.map(isSelectedCampaign)
      },
      function(err){
        console.error("error! %O",err)
      }
    )  
  }

  function refreshCampaignsInfo(){
    $scope.campaigns = campaign.getAllCampaigns().then(
      function(data){
        $scope.campaigns = data
      },function(err){
        console.error("problem getting campaigns")
      }
    )
  }

  function updateUser(){
    user.updateUser($scope.currentUser).then(
      function(response){
        console.log("Update ok!! %O", response)
      },function(error){
        console.error("something went wrong when updating! %O", error)
      }
    )
  }

  refreshUserInfo()
  refreshCampaignsInfo()

});
