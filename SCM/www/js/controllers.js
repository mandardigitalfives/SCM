angular.module('starter.controllers', ['ionic-toast'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, store, $ionicSideMenuDelegate, $ionicNavBarDelegate) {

    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
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

.controller('logincontroller', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', '$ionicNavBarDelegate','$ionicLoading', function($scope, $rootScope, $http, $state, $stateParams, store, $ionicNavBarDelegate,$ionicLoading) {

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
                }
                store.set('userdata', userdata);
                $rootScope.islogin = store.get('userdata');
                $ionicNavBarDelegate.showBackButton(false);
                $ionicLoading.hide();
                $state.go('app.browse');
            } else {
                $scope.errMsgLogin = response.message;
            }
        }).error(function() {
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

    $ionicLoading.show({
        noBackdrop: true,
        template: '<p class="item-icon-left">Please wait...<ion-spinner icon="lines"/></p>'
    });

    $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/get_JoblistAgency.php").then(function(response) {
            $scope.datalist = response.data;
            // console.log($scope.datalist);
        });

    }, 5000);


    $scope.showDetails = function(datalist) {

        /*  if (response == Id) {*/
        $state.go('app.truckDetails');
        /*                };
         */
    }




})

.controller('detailsCtrl', function($scope, $stateParams, $http, $ionicLoading, $timeout, ionicToast) {


    $ionicLoading.show({

        noBackdrop: true,
        template: '<p class="item-icon-left">Please wait...<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner></p>'
    });

    $timeout(function() {
        $ionicLoading.hide();

        $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php").then(function(response) {
            $scope.details_list = response.data;
            // console.log($scope.datalist);
        });

    }, 5000);
    /* $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php").then(function(response) {
        $scope.details_list = response.data;
        $scope.details_list.Truck_Number=$scope.details_list.Truck_Number;
         $scope.details_list.agencyDetails= $scope.details_list.agencyDetails;
         $scope.details_list.Truck_RegNumber= $scope.details_list.Truck_RegNumber;
         $scope.details_list.Truck_Capacity= $scope.details_list.Truck_Capacity;
         $scope.details_list.Driver_Name= $scope.details_list.Driver_Name;
         $scope.details_list.Id=$scope.details_list.Id;
        
       
         console.log($scope.details_list);
      });         */
    $scope.JobList = [];
    $scope.UserData = {};

    $scope.AllotTruck = function(type) {
        <!-- ionicToast.show(message, position, stick, time); -->

        var data = $.param({
            'data': $scope.UserData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php").then(function(response) {
            $scope.data_allot = response.data;
            $scope.data_allot.Status = $scope.data_allot.Status;
            console.log($scope.data_allot.Status);

            if (response.data == 'OK') {


                if (type == 'edit') {

                    $scope.JobList[$scope.index].Status = $scope.UserData.Status;

                } else {
                    $scope.JobList.push({
                        Status: response.data.Status

                    });

                }
                $scope.UserData = {};
                //$scope.messageSuccess(response.msg);
            } else {
                //$scope.messageError(response.msg);
            }
        });
        /*
                      $http.get("http://digitalfives-apps.org/android_database_Connect/getJobDetailsAgency.php").then(function(response) {
          $scope.data_allot = response.data;
          $scope.data_allot.Truck_Number=$scope.data_allot.Truck_Number;
          $scope.data_allot.agencyDetails=$scope.data_allot.agencyDetails;
          $scope.data_allot.Truck_Capacity=$scope.data_allot.Truck_Capacity;
         
          $scope.data_allot.Truck_=scope.data_allot.agencyDetails;
           $scope.data_allot.agencyDetails=scope.data_allot.agencyDetails;
           $scope.data_allot.agencyDetails=scope.data_allot.agencyDetails;
           ionicToast.show('Truck Alloted Successfully....'+$scope.data_allot.Truck_Number+'<br/>'+$scope.data_allot.agencyDetails+'<br/>'+$scope.data_allot.Truck_Capacity+'<br/>','middle', false, 4000);
           
          var ChangeStatus= response.data;
            if (response.status==1) {
                console.log(ChangeStatus.Status);
            };

           });*/





    }

    $scope.hideToast = function() {
        ionicToast.hide();
    };
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

        /*  if (response == Id) {*/
        $state.go('app.agencyDetails');
        /*                };
         */
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

});
