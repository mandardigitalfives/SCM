angular.module('starter.controllers').controller('TrucklistCtrl', function($scope, $ionicModal, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store) {

    $scope.$on('modal.shown', function() {
        $scope.init1();
        $scope.TruckList ="";
    });

    $scope.init1 = function() {
        $scope.truckDetails = store.get("userdata");
        var ItemI = {
            refuid: $scope.managerId,
            type: "truck",
        }
        $scope.getTrucklist(ItemI);
    }

    $scope.getTrucklist = function(ItemI) {
        $http.post(baseURL + 'getTrucklist', ItemI).success(function(response, request) {
            console.log(response);
            $scope.TruckList = response.record;
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })

    };
});
