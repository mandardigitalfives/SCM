angular.module('starter.controllers').controller('managerListCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout,$rootScope,store) {
       $scope.init = function(){
       	$scope.mangerDetails =store.get("userdata");
          console.log($scope.mangerDetails);
       }

     $scope.getManager = function(){
          var managerData= {

          	 type : $scope.mangerDetails.type,
          	 refUid : $scope.mangerDetails.refUid

          }
        $http.post( baseURL + 'getManager',managerData).success(function (response, request) {
            $scope.mangerlist = response;
           console.log( $scope.mangerlist);
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })
    };

});
