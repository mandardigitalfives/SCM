angular.module('starter.controllers').controller('createdjobCtrl', function($scope, $stateParams, $http, $rootScope, store,$ionicLoading,$ionicPopup,$state) {
    $scope.init = function() {
        $rootScope.userDetails = store.get('userdata') || false;


    }
    $scope.Submit = function(details) {
        console.log(details);

        var data = {
            job_title: details.job_title,
            job_description: details.job_descp,
            job_DeliveryAddress: details.deliveryAddress,
            jobCreatedBy: $scope.userDetails.user_id,
        }
        $http.post(baseURL + "addJob", data).success(function(response, request) {
            console.log(response);
            if (response.status == true) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'JobCreated Success.',
                });
                $state.go('app.manager_Joblist.created_job');
            }else{
                $scope.errorMsg = response.message;
            }
        }).error(function() {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Connection Problem.',
                template: 'Please check your connection!'
            });
        });
    }


    $scope.getJob = function(){
            var jobdata = {
                  type: "manager",
                  user_Id: $rootScope.islogin.user_id
                 
            }
        $http.post(baseURL + 'getJob',jobdata).success(function(response, request) {
            console.log(response);
            $scope.jobList = response.record;
            console.log( $scope.jobList);
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    };

    $scope.showJobDetails = function(job_Title,job_Description,job_DeliveryAddress){
      console.log(job_Title);
      $state.go('app.manager_jobDetails',{job_Title: job_Title, job_Description: job_Description, job_DeliveryAddress:job_DeliveryAddress});
  }
});
