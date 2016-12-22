angular.module('starter.controllers').controller('managerListCtrl', function($scope, $stateParams,$ionicModal, $http, $state, $ionicLoading, $timeout,$rootScope,store) {
      
   $ionicModal.fromTemplateUrl('templates/browse_trucklist.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTruckList = function() {
    $scope.modal.hide();
  };


       $scope.init = function(){
       	$scope.mangerDetails =store.get("userdata");
          console.log($scope.mangerDetails);
       }

     $scope.getManager = function(){
          var managerData= {
          	 type : "manager",
          	 refUid : $scope.mangerDetails.refUid
          }
        $http.post( baseURL + 'getManager',managerData).success(function (response, request) {
           console.log( response );
           $scope.managerList = response.record;
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })
    };


    $scope.showTruckList = function(Id){
     
      $scope.modal.show();
    }

});
