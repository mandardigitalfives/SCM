angular.module('starter.controllers').controller('profileCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store,$ionicLoading) {
    $scope.init = function() {
    	$rootScope.Loadingshow();
        $scope.userdata = store.get('userdata') || false;
        var userdata = {
            Uid: $scope.userdata.user_id
        }
        $http.post(baseURL + "getProfile", userdata).success(function(response, request) {
            $scope.profiledetails = response.record;
            console.log($scope.profiledetails);
            $timeout(function() {
            	$ionicLoading.hide();	
            }, 300);
        }).error(function() {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Connection Problem.',
                template: 'Please check your credentials!'
            });
        });
    }
})
