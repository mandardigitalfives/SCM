// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'angular-storage', 'ngCordova', 'ngMap','ngMessages'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.factory('socket', function(socketFactory) {
    //Create socket and connect to http://chat.socket.io
    var myIoSocket = io.connect('http://n2.transparent.sg:3000/');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: '/login',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'logincontroller'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html',
                controller: 'listCtrl'
            }
        }
    })

    .state('app.Browse_truck', {
        url: '/Browse_truck',
        views: {
            'menuContent': {
                templateUrl: 'templates/Browse_truck.html',
                controller: 'AgencyCtrl'
            }
        }
    })


    .state('app.truckDetails', {
        url: '/truckDetails/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/truckDetails.html',
                controller: 'detailsCtrl'
            }
        }
    })

    .state('app.trackTruck', {
        url: '/trackTruck',
        views: {
            'menuContent': {
                templateUrl: 'templates/trackTruck.html',
                controller: 'trackTruckCtrl'
            }
        }
    })


    .state('app.take_photo', {
        url: '/take_photo',
        views: {
            'menuContent': {
                templateUrl: 'templates/take_photo.html',
                controller: 'takePhoto'
            }
        }
    })

    .state('app.agency_location', {
            url: '/agency_location',
            views: {
                'menuContent': {
                    templateUrl: 'templates/agency_location.html',
                    controller: 'agency_location'
                }
            }
        })
        .state('app.agencyDetails', {
            url: '/agencyDetails/:Id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/agencyDetails.html',
                    controller: 'agencyDetailsCrl'
                }
            }
        });




    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
