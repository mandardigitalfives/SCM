angular.module('starter.controllers').controller('TrucklistCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store, ionicMaterialMotion, ionicMaterialInk) {

    $scope.init = function() {
        $scope.truckDetails = store.get("userdata");
        console.log($scope.truckDetails);
        var ItemI = {
            refuid: $stateParams.Id,
            Name:  $stateParams.Name,
            UserId: $stateParams.UserId,
            Company_name: $stateParams.Company_name,
            profile_image: $stateParams.profile_image,
            type: "truck",
        }
        console.log(ItemI);
        $scope.ManagerDetails=ItemI;
         $scope.getTrucklist(ItemI);
    }

    $scope.getTrucklist = function(ItemI) {
        $http.post(baseURL + 'getTrucklist', ItemI).success(function(response, request) {
            console.log(response);
            $scope.TruckList = response.record;
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
            ionicMaterialInk.displayEffect();
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })

     };
});
 