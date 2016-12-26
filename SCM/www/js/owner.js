

angular.module('starter.controllers').controller('managerListCtrl', function($scope, $stateParams, $ionicModal, $http, $state, $ionicLoading, $timeout, $rootScope, store) {

    $scope.init = function() {
        $scope.mangerDetails = store.get("userdata");
        $scope.managerId = '0';
    }

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


    $scope.showTruckList = function(Id){
     
      $state.go('app.browse_trucklist',{Id : Id});

    }
});
