angular.module('starter.controllers').controller('profileCtrl', function($scope, $stateParams, $http, $state, $ionicLoading, $timeout, $rootScope, store, $ionicLoading, $ionicPopup, $ionicModal) {

    $scope.init = function() {
        $rootScope.Loadingshow();
        $scope.userdata = store.get('userdata') || false;
        console.log($scope.userdata);
        var userdata = {
            Uid: $scope.userdata.user_id,
            user_type: $scope.userdata.type
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

        $scope.labelss = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 82]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }, {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }]
            }
        };
    }

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.chartDetails = function() {
        $ionicModal.fromTemplateUrl('templates/chartDetails.html', {
            scope: $scope,
            // animation: 'none'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.editProfile = function(firstname, lastname) {
        $rootScope.Loadingshow();
        var data = {
            firstname: firstname,
            lastname: lastname,
            Uid: $scope.userdata.user_id,
            user_type: $scope.userdata.type
        }

        $http.post(baseURL + "updateProfile", data).success(function(response, request) {
            if (response.status == true) {
                $rootScope.islogin.Name = firstname;
                $rootScope.islogin.last_name = lastname;
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Done.',
                    template: 'Profile Updated Successfully!'
                });
            } else {
                console.log(response)
                $ionicLoading.hide();
            }
        }).error(function() {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Connection Problem.',
                template: 'Please check your credentials!'
            });
        });
    }

    $scope.gohome = function() {
        if (store.get('userdata').type == 'manager') {
            $state.go('app.manager_Joblist');
        } else if (store.get('userdata').type == 'truck') {
            $state.go('app.browse_joblist');
        } else if (store.get('userdata').type == 'owner') {
            $state.go('app.managerList');
        };
    }
})
