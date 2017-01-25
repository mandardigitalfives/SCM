angular.module('starter.controllers').controller('managerListCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store) {
    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        console.log(baseURL);
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }
    }

    $scope.getManager = function() {
        var managerData = {
            type: "manager",
            refUid: $rootScope.islogin.user_id
        }

        console.log(managerData);

        $http.post(baseURL + 'getManager', managerData).success(function(response, request) {
            console.log(response);
            $scope.managerList = response.record;
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    };

    $scope.showTruckList = function(Id, Name, UserId, Company_name, profile_image) {
        console.log(profile_image);
        $state.go('app.browse_trucklist', { Id: Id, Name: Name, UserId: UserId, Company_name: Company_name, profile_image: profile_image });
    }
});
