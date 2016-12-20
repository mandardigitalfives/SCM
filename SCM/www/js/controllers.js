angular.module('starter.controllers', ['ionic-toast'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, store, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicLoading,$ionicPopup) {

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

.controller('logincontroller', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$ionicNavBarDelegate', '$ionicLoading',"$ionicPopup", function($scope, $rootScope, $http, $state, $stateParams, store, $ionicNavBarDelegate, $ionicLoading,$ionicPopup) {

    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        console.log( baseURL);
        if ($rootScope.islogin) {
            $state.go('app.browse_trucklist');
        }
    }

    $scope.user = {
        email: "admin@admin.com",
        password: "admin123"
    }

    $scope.login = function(user) {
        $rootScope.Loadingshow();
        var baseURL = "http://digitalfives-apps.org/android_database_Connect/login.php";
        $http.post(baseURL, user).success(function(response, request) {
        // $http.post(baseURL+"login", user).success(function(response, request) {
            if (response.isLogin == true) {
                console.log(response);
                userdata = {
                    user_login: true,
                    user_id: response.Uid,
                    email: response.UserId,
                    type: response.type,
                    refUid : response.RefUid
                }
                store.set('userdata', userdata);
                $rootScope.islogin = store.get('userdata');
                $ionicNavBarDelegate.showBackButton(false);
                $ionicLoading.hide();

                if (store.get('userdata').type == 'manager') {
                    $state.go('app.managerList');

                } else if (store.get('userdata').type == 'truck') {
                    $state.go('app.browse_joblist');
                }else if (store.get('userdata').type == 'Owner') {
                    $state.go('app.managerList');
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
