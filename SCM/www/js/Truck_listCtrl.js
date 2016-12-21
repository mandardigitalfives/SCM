angular.module('starter.controllers').controller('TrucklistCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout,$rootScope,store) {
    $scope.init = function(){
     $scope.truckDetails = store.get("userdata");
      console.log($scope.truckDetails);
      var ItemI = {
            refuid: $stateParams.Id,
            type : "truck",
            
        }
         $scope.getTrucklist(ItemI);
         
    }

     $scope.getTrucklist = function(ItemI){
        
        $http.post( baseURL + 'getTrucklist',ItemI).success(function (response, request) {
           console.log( response );
           $scope.TruckList = response.record;
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })

     };
});
 