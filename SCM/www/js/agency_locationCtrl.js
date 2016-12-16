angular.module('starter.controllers').controller('agency_location', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$cordovaGeolocation', '$ionicLoading', function($scope, $rootScope, $http, $state, $stateParams, store, $cordovaGeolocation, $ionicLoading) {

    $scope.positions = [];
    var posOptions = { maximumAge: 600000, timeout: 7000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.positions = {
            lat: $scope.lat,
            lng: $scope.lng
        }
        console.log($scope.positions);
        $ionicLoading.hide();
    }, function(err) {
        console.log(err)
    });


    var watchOptions = { maximumAge: 600000, timeout: 7000, enableHighAccuracy: true };

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


   
    // var socketURL = "http://localhost:9999";
    // var newgigisadded = io(socketURL + '/newgig');
    // newgigisadded.on('newgig', function(data) {
    //     console.log(data);
    //     $scope.lat = position.coords.latitude
    //     $scope.lng = position.coords.longitude
    //     $scope.positions = {
    //         lat: $scope.lat,
    //         lng: $scope.lng
    //     }
    // });

}]);
