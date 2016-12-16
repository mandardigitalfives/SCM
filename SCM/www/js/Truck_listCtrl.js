
angular.module('starter.controllers').controller('listCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout) {

    $scope.init = function() {

    }



    $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/get_JoblistAgency.php").then(function(response) {

            $scope.datalist = response.data;

        });

    }, 5000);

    $scope.showDetails = function(Id) {
        $state.go('app.truckDetails', { Id: Id });
    }
});

