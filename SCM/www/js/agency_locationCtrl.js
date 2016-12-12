angular.module('starter.controllers').controller('agency_location', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store','$cordovaGeolocation', function($scope, $rootScope, $http, $state, $stateParams, store, $cordovaGeolocation) {
	console.log("agency_location");

	 var posOptions = {timeout: 10000, enableHighAccuracy: false};
	 $cordovaGeolocation
   .getCurrentPosition(posOptions)
	
   .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log(lat + '   ' + long);
      $scope.lat = lat;
      $scope.long = long;
   }, function(err) {
      console.log(err)
   });


   var watchOptions = {timeout : 100, enableHighAccuracy: false};
   var watch = $cordovaGeolocation.watchPosition(watchOptions);
	
   watch.then(
      null,
		
      function(err) {
         console.log(err)
      },
		
      function(position) {
         var lat  = position.coords.latitude
         var long = position.coords.longitude
         console.log(lat + '' + long)
         $scope.lat = lat;
      	 $scope.long = long;
      }
   );

   watch.clearWatch();

}]);
