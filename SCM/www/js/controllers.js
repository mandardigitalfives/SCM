angular.module('starter.controllers', ['ionic-toast'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, store, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicLoading, $ionicPopup) {
         $scope.ProfileImage = ProfileImage;
        $scope.init = function() {
            $rootScope.islogin = store.get('userdata') || false;
            if (!$rootScope.islogin) {
                $state.go('login');
            }
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
            $state.go('login');
        }
    })

.controller('logincontroller', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$ionicNavBarDelegate', '$ionicLoading', "$ionicPopup", function($scope, $rootScope, $http, $state, $stateParams, store, $ionicNavBarDelegate, $ionicLoading, $ionicPopup) {
      
      

    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        if ($rootScope.islogin) {
            if ($rootScope.islogin.type == "manager") {
                $state.go('app.truck-list');
            } else if ($rootScope.islogin.type == "Owner") {
                $state.go('app.managerList');
            } else if ($rootScope.islogin.type == "truck") {
                $state.go('app.browse_joblist');
            }
        } else {
            console.log("please Login");
        }
    }

    $rootScope.Loadingshow = function() {
        $ionicLoading.show({
            noBackdrop: true,
            template: '<p class="item-icon-left">Please wait...<ion-spinner icon="lines"/></p>'
        });
    }

    $scope.user = {
        // email: "owner@owner.com",
        // password: "owner123"

         // email: "JakobTobiassen@rhyta.com",
         // password: "mac123"
        // email :"KennethAGarrison@armyspy.com",
        // password : "dell123"

        email : "mac@digitalfives.com",
        password : "driver123"

    }

    $scope.login = function(user) {
        $scope.errMsgLogin = '';
        $rootScope.Loadingshow();
        $http.post(baseURL + "login", user).success(function(response, request) {
            console.log(response)
            if (response.status == true) {
                userdata = {
                    user_login: true,
                    user_id : response.record.user_Id,
                    email : response.record.user_Email,
                    type : response.record.user_Type,
                    Name : response.record.user_FirstName,
                    last_name : response.record.user_LastName,
                    profile_image: response.record.user_ProfileImage,
                    refUid : response.record.user_RefId
                }
                console.log("userdata_82", userdata);
                store.set('userdata', userdata);
                $rootScope.islogin = store.get('userdata');
                $ionicNavBarDelegate.showBackButton(false);
                $ionicLoading.hide();

                if (store.get('userdata').type == 'manager') {
                    $state.go('app.manager_Joblist');
                } else if (store.get('userdata').type == 'driver') {
                    $state.go('app.browse_joblist');
                } else if (store.get('userdata').type == 'owner') {
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
