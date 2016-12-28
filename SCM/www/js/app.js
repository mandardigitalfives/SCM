angular.module('starter', ['ionic', 'starter.controllers', 'angular-storage', 'ngCordova', 'ngMap', 'ngMessages', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.factory('socket', function(socketFactory) {
    //Create socket and connect to http://chat.socket.io
    var myIoSocket = io.connect('http://localhost:9999/');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'logincontroller'
            }
        }
    })

    .state('app.managerList', {
        url: '/managerList',
        views: {
            'menuContent': {
                templateUrl: 'templates/managerList.html',
                controller: 'managerListCtrl'
            }
        }
    })

    .state('app.browse_trucklist', {
        url: '/managerList/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse_trucklist.html',
                controller: 'TrucklistCtrl'
            }
        }
    })

       .state('app.truck-list', {
        url: '/truck-list',
        views: {
            'menuContent': {
                templateUrl: 'templates/truck-list.html',
                controller: ''
            }
        }
    })

        .state('app.truck-list.available_truck', {
        url: '/available_truck',
        views: {
            'app.truck-list.available_truck': {
                templateUrl: 'templates/available_truck.html',
                controller: ''
            }
        }
    })
      

        .state('app.truck-list.ongoing_truck', {
        url: '/ongoing_truck',
        views: {
            'app.truck-list.ongoing_truck': {
                templateUrl: 'templates/ongoing_truck.html',
                controller: ''
            }
        }
    })
        
    .state('app.browse_joblist', {
        url: '/browse_joblist',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse_joblist.html',
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
