angular.module('starter.controllers')
.controller('AgencyCtrl', function($scope, $http, $ionicLoading, $timeout, $state,$rootScope ) {
         
         $scope.init = function(){
$rootScope.Loadingshow();
            
        $http.get("http://digitalfives-apps.org/android_database_Connect/get_Joblist.php?Status=Assigned").then(function(response) {
            $scope.job_list = response.data;
            console.log($scope.job_list);
        });    
         }
    $timeout(function() {
        
    }, 5000);

    $scope.showDetails = function(Id) {
        $state.go('app.agencyDetails',{Id:Id});
    }

    $scope.AllotTruck = function() {
        $scope.data_allot.Truck_Number = $scope.data_allot.Truck_Number;
        console.log($scope.data_allot.Truck_Number);
    }  
})




.controller('agencyDetailsCrl',function($scope,$http,$state,$stateParams){
  
  $scope.init=function(){
      $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetails.php").then(function(response) {
            $scope.job_details = response.data;
            console.log($scope.job_details);
        });
    }, 5000);

  }
});

