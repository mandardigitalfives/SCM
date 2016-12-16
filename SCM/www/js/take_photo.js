angular.module('starter.controllers').controller('takePhoto', function($scope, $http, $ionicLoading, $timeout, $state) {

    var myimage = document.getElementById("largeImage").src;
    console.log(myimage);
    Tesseract.recognize("myimage")
        .then(function(result) {
            console.log(result);
        })
});
