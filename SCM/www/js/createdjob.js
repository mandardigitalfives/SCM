angular.module('starter.controllers').controller('createdjobCtrl', function($scope, $stateParams, $http,$rootScope) {
    $scope.init = function() {
       
    }

    $scope.Submit = function(details){
         console.log(details);
         
          var data = {
            job_title: job_Title,
            job_description: job_description,
            job_DeliveryAddress : job_DeliveryAddress,
            Uid: $scope.userdata.user_id,
            user_type: $scope.userdata.type
        }
        $http.post(baseURL + "createdjob", data).success(function(response, request) {
            console.log(response)
              

            });
       

    }
});