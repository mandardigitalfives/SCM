angular.module('starter.controllers').controller('detailsCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout, ionicToast) {
    $scope.init = function() {
        var ItemI = {
            ItemId: $stateParams.Id
        }
        $http.post("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php", ItemI).success(function(res, req) {
            $scope.itemDetails = res;
            console.log($scope.itemDetails);
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    }
});