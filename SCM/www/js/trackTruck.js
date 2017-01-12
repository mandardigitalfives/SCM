angular.module('starter.controllers').controller('trackTruckCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$cordovaGeolocation', '$ionicLoading', '$ionicPopup', function($scope, $rootScope, $http, $state, $stateParams, store, $cordovaGeolocation, $ionicLoading, $ionicPopup) {

    var posOptions = { maximumAge: 60000, timeout: 10000, enableHighAccuracy: false };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)

    .then(function(position) {
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.positions = {
            lat: $scope.lat,
            lng: $scope.lng
        }
        console.log($scope.positions)
        $ionicLoading.hide();
    }, function(err) {
        // if (err.code == 1) {
        //     var alertPopup = $ionicPopup.alert({
        //         title: "Warning",
        //         template: err.message
        //     });
        //     $ionicLoading.hide();
        // } else if (err.code == 2) {
        //     var alertPopup = $ionicPopup.alert({
        //         title: "Warning",
        //         template: err.message
        //     });
        //     $ionicLoading.hide();
        // } else if (err.code == 3) {
        //     var alertPopup = $ionicPopup.alert({
        //         title: "Warning",
        //         template: err.message
        //     });
        //     $ionicLoading.hide();
        // }
    });


    var watchOptions = { maximumAge: 60000, timeout: 10000, enableHighAccuracy: false };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);

    watch.then(
        null,
        function(err) {
            // if (err.code == 1) {
            //     var alertPopup = $ionicPopup.alert({
            //         title: "Warning",
            //         template: err.message
            //     });
            //     $ionicLoading.hide();
            // } else if (err.code == 2) {
            //     var alertPopup = $ionicPopup.alert({
            //         title: "Warning",
            //         template: err.message
            //     });
            //     $ionicLoading.hide();
            // }
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


    // $scope.centerOnMe();
    var socketURL = "http://localhost:9999";
    var trackTruck = io(socketURL + '/tracktruck');
    trackTruck.on('tracktruck', function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.lat = data[i].lat;
            $scope.lng = data[i].lng;
            $scope.positions = {
                lat: data[i].lat,
                lng: data[i].lng
            }
        }
        console.log($scope.positions);
        var alertPopup = $ionicPopup.alert({
                title: "Lat -: "+$scope.lat+"<BR>"+'Lng -:  '+$scope.lng,
                template: "HI....."
            });
        $scope.$apply();
        $ionicLoading.hide();
        trackTruck.off();//For Socket oFF
    });
}]);
