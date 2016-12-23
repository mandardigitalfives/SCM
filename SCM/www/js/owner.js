<<<<<<< HEAD
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
=======
angular.module('starter.controllers').controller('managerListCtrl', function($scope, $stateParams, $ionicModal, $http, $state, $ionicLoading, $timeout, $rootScope, store) {

    $scope.init = function() {
        $scope.mangerDetails = store.get("userdata");
        $scope.managerId = '0';
    }
>>>>>>> cb698182b1b2950ba5637e48195d2b64b437b542

    $scope.getManager = function() {
        var managerData = {
            type: "manager",
            refUid: $scope.mangerDetails.refUid
        }
        $http.post(baseURL + 'getManager', managerData).success(function(response, request) {
            console.log(response);
            $scope.managerList = response.record;
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    };

    $ionicModal.fromTemplateUrl('templates/browse_trucklist.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showTruckList = function(Id) {
        $scope.managerId = Id;
        $scope.modal.show();
    }

    $scope.closeTruckList = function() {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
});
