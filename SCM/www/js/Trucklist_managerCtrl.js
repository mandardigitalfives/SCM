angular.module('starter.controllers').controller('Trucklist_managerCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store, ionicMaterialMotion, ionicMaterialInk, $cordovaGeolocation, $ionicPopup, $ionicModal) {

    $scope.init = function() {
        $scope.userDetails = store.get("userdata");
        console.log($scope.userDetails);
        var data = {
            managerId: $scope.userDetails.user_id,
            type: "truck"
        }
        console.log(data);
        $scope.getTrucklist(data);
    }

    $scope.getTrucklist = function(ItemI) {
        $rootScope.Loadingshow();
        $http.post(baseURL + 'getTrucklist', ItemI).success(function(response, request) {
            $scope.TruckList = response.record;
            console.log($scope.TruckList);
            $ionicLoading.hide();
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    };

    $scope.tracktruck = function() {
        $state.go('app.trackTruck');
        // $ionicModal.fromTemplateUrl('templates/trackTruck_manager.html', {
        //     scope: $scope,
        //     // animation: 'none'
        // }).then(function(modal) {
        //     $scope.modal = modal;
        //     $scope.modal.show();
        // });
    }

    // Triggered in the login modal to close it
   $scope.closeLogin = function() {
       $scope.modal.hide();
   };

    $scope.showVehicleDetails = function(Id,Name){
      console.log(Id);
      $state.go('app.manager_jobDetails',{Id : Id, Name: Name});
  }
})
