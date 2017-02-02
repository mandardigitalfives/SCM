angular.module('starter.controllers').controller('jobdetailsCtrl', function($scope, $stateParams, $http, $rootScope, store,$ionicLoading,$ionicPopup,$state) {
    $scope.init = function() {
        $rootScope.userDetails = store.get('userdata') || false;

        var datajob = {
            managerId: $scope.userDetails.user_id,
            type: "truck",
            job_Title: $stateParams .job_Title,
            job_Description: $stateParams .job_Description,
           job_DeliveryAddress: $stateParams .job_DeliveryAddress

            }
             $scope.jobdetais = datajob;
        console.log( $scope.jobdetais);

         
    }
});