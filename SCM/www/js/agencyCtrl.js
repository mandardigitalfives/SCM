angular.module('starter.controllers')
.controller('AgencyCtrl', function($scope, $http, $ionicLoading, $timeout, $state) {
    $ionicLoading.show({
        noBackdrop: true,
        template: '<p class="item-icon-left">Please wait...<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner></p>'
    });
    $timeout(function() {
        $ionicLoading.hide();
        $http.get("http://digitalfives-apps.org/android_database_Connect/get_Joblist.php?Status=Assigned").then(function(response) {
            $scope.job_list = response.data;
            console.log($scope.job_list);
        });
    }, 5000);

    $scope.showDetails = function(datalist) {
        $state.go('app.agencyDetails');
    }
    $scope.AllotTruck = function() {
        $scope.data_allot.Truck_Number = $scope.data_allot.Truck_Number;
        console.log($scope.data_allot.Truck_Number);
    }

    $ionicLoading.show({

        noBackdrop: true,
        template: '<p class="item-icon-left">Please wait...<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner></p>'
    });

    $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetails.php").then(function(response) {
            $scope.job_details = response.data;
            console.log($scope.job_details);
        });
    }, 5000);

});

