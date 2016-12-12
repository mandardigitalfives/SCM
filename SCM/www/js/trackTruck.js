angular.module('starter.controllers').controller('trackTruckCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$cordovaGeolocation', '$ionicLoading', function($scope, $rootScope, $http, $state, $stateParams, store, $cordovaGeolocation, $ionicLoading) {

    $scope.positions = [];
    var posOptions = { maximumAge:600000, timeout:7000, enableHighAccuracy: true };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)

    .then(function(position) {
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.positions= {
            lat: $scope.lat,
            lng: $scope.lng
        }
        console.log($scope.positions)
        $ionicLoading.hide();
    }, function(err) {
        console.log(err)
    });


    var watchOptions = { maximumAge:600000, timeout:7000, enableHighAccuracy: true };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);

    watch.then(
        null,
        function(err) {
            console.log(err)
        },

        function(position) {
            $scope.lat = position.coords.latitude
            $scope.lng = position.coords.longitude
            $scope.positions = {
                lat: $scope.lat,
                lng: $scope.lng
            }
            

        });

    // watch.clearWatch();


    $scope.centerOnMe = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
}]);
