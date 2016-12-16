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
}])


.controller('listCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout) {

    $scope.init = function() {

    }



    $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/get_JoblistAgency.php").then(function(response) {

            $scope.datalist = response.data;

        });

    }, 5000);

    $scope.showDetails = function(Id) {
        $state.go('app.truckDetails', { Id: Id });
    }
})

.controller('detailsCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout, ionicToast) {
    $scope.init = function() {
        var ItemI = {
            ItemId: $stateParams.Id
        }
        $http.post("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php", ItemI).success(function(res, req) {
            $scope.itemDetails = res;
            console.log($scope.itemDetails);
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    }
})

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

})

.controller('takePhoto', function($scope, $http, $ionicLoading, $timeout, $state) {

    var myimage = document.getElementById("largeImage").src;
    console.log(myimage);
    Tesseract.recognize("myimage")
        .then(function(result) {
            console.log(result);
        })
})
