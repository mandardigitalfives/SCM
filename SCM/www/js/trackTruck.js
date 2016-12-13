angular.module('starter.controllers').controller('trackTruckCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$cordovaGeolocation', '$ionicLoading', function($scope, $rootScope, $http, $state, $stateParams, store, $cordovaGeolocation, $ionicLoading) {


    var posOptions = { maximumAge:600000, timeout:7000, enableHighAccuracy: false };
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


    var watchOptions = { maximumAge:600000, timeout:7000, enableHighAccuracy: false };

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

    // // watch.clearWatch();


    $scope.centerOnMe = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };

    $scope.centerOnMe();
    // var socketURL = "http://localhost:9999";
    // var newgigisadded = io(socketURL + '/newgig');
    // newgigisadded.on('newgig', function(data) {

    //     for (var i = 0; i < data.length; i++) {
    //         $scope.lat = data[i].lat;
    //         $scope.lng = data[i].lng;
    //         $scope.positions = {
    //             lat: data[i].lat,
    //             lng: data[i].lng
    //         }
    //     }
    //     console.log($scope.positions);
    //     $scope.$apply();
    //     $ionicLoading.hide();
    //     // newgigisadded.off();
    // });
}]);
