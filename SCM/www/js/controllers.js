angular.module('starter.controllers', ['ionic-toast'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, store, $ionicSideMenuDelegate, $ionicNavBarDelegate) {

    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
    }

    $rootScope.Loadingshow = function() {
        $ionicLoading.show({
            noBackdrop: true,
            template: '<p class="item-icon-left">Please wait...<ion-spinner icon="lines"/></p>'
        });
    }

    $scope.logout = function() {
        store.remove('userdata');
        localStorage.clear();
        $ionicSideMenuDelegate.toggleLeft();
        $ionicNavBarDelegate.showBackButton(false);
        $scope.init();
        $state.go('app.login');
    }
})

.controller('logincontroller', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$ionicNavBarDelegate', '$ionicLoading', function($scope, $rootScope, $http, $state, $stateParams, store, $ionicNavBarDelegate, $ionicLoading) {

    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        if ($rootScope.islogin) {
            $state.go('app.browse');
        }
    }

    $scope.showLoader = function() {

        $ionicLoading.show({
            noBackdrop: true,
            template: '<p class="item-icon-left">Login in...<ion-spinner icon="lines"/></p>'
        });
    }

    $scope.user = {
        email: "mac@digitalfives.com",
        password: "mac123"
    }

    $scope.login = function(user) {
        $scope.showLoader();
        $http.post("http://digitalfives-apps.org/android_database_Connect/login.php", user).success(function(response, request) {

            if (response.isLogin == true) {
                console.log(response);
                userdata = {
                    user_login: true,
                    user_id: response.Uid,
                    email: response.UserId,
                    type: response.type,
                }
                store.set('userdata', userdata);
                $rootScope.islogin = store.get('userdata');
                $ionicNavBarDelegate.showBackButton(false);
                $ionicLoading.hide();

                if (store.get('userdata').type == 'truck') {
                    $state.go('app.browse');

                } else if (store.get('userdata').type == 'agency') {
                    $state.go('app.Browse_truck');
                };
            } else {
                $ionicLoading.hide();
                $scope.errMsgLogin = response.message;
            }
        }).error(function() {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Connection Problem.',
                template: 'Please check your credentials!'
            });
        });


    };
}]);


