function SimplePubSub() {
    var events = {};
    return {
        on: function(names, handler) {
            names.split(' ').forEach(function(name) {
                if (!events[name]) {
                    events[name] = [];
                }
                events[name].push(handler);
            });
            return this;
        },
        trigger: function(name, args) {
            angular.forEach(events[name], function(handler) {
                handler.call(null, args);
            });
            return this;
        }
    };
};

angular.module('tabSlideBox', []).directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}).directive('tabSlideBox', ['$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
    'use strict';

    return {
        restrict: 'A, E, C',
        link: function(scope, element, attrs, ngModel) {

            var ta = element[0],
                $ta = element;
            $ta.addClass("tabbed-slidebox");
            if (attrs.tabsPosition === "bottom") {
                $ta.addClass("btm");
            }

            function renderScrollableTabs() {
                var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
                    icons = iconsDiv.find("a"),
                    wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"),
                    totalTabs = icons.length;
                var scrollDiv = wrap.querySelector(".scroll");

                angular.forEach(icons, function(value, key) {
                    var a = angular.element(value);
                    a.on('click', function() {
                        $ionicSlideBoxDelegate.slide(key);
                    });
                });

                var initialIndex = attrs.tab;
                //Initializing the middle tab
                if (typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0) {
                    initialIndex = 0;
                } else {
                    initialIndex = Math.floor(icons.length / 2);
                }

                //If initial element is 0, set position of the tab to 0th tab 
                if (initialIndex == 0) {
                    setPosition(0);
                }

                $timeout(function() {
                    $ionicSlideBoxDelegate.slide(initialIndex);
                }, 0);
            }

            function setPosition(index) {
                var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
                    icons = iconsDiv.find("a"),
                    wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"),
                    totalTabs = icons.length;
                var scrollDiv = wrap.querySelector(".scroll");

                var middle = iconsDiv[0].offsetWidth / 2;
                var curEl = angular.element(icons[index]);
                if (curEl && curEl.length) {
                    var curElWidth = curEl[0].offsetWidth,
                        curElLeft = curEl[0].offsetLeft;

                    angular.element(iconsDiv[0].querySelector(".active")).removeClass("active");
                    curEl.addClass("active");

                    var leftStr = (middle - (curElLeft) - curElWidth / 2 + 4);
                    //If tabs are not scrollable
                    if (!scrollDiv) {
                        var leftStr = (middle - (curElLeft) - curElWidth / 2 + 4) + "px";
                        wrap.style.webkitTransform = "translate3d(" + leftStr + ",0,0)";
                    } else {
                        //If scrollable tabs
                        var wrapWidth = wrap.offsetWidth;
                        var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
                        var leftOffset = 100;
                        var elementOffset = 40;
                        //If tabs are reaching right end or left end
                        if (((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))) {
                            if (leftStr > 0) {
                                leftStr = 0;
                            }
                            //Use this scrollTo, so when scrolling tab manually will not flicker
                            $ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
                        }
                    }
                }
            };

            function getX(matrix) {
                matrix = matrix.replace("translate3d(", "");
                matrix = matrix.replace("translate(", "");
                return (parseInt(matrix));
            }
            var events = scope.events;
            events.on('slideChange', function(data) {
                setPosition(data.index);
            });
            events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                renderScrollableTabs();
            });

            renderScrollableTabs();
        },
        controller: function($scope, $attrs, $element) {
            $scope.events = new SimplePubSub();

            $scope.slideHasChanged = function(index) {
                $scope.events.trigger("slideChange", { "index": index });
            };

            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.events.trigger("ngRepeatFinished", { "event": ngRepeatFinishedEvent });
            });
        }
    };

}]);

angular.module('starter', ['ionic', 'starter.controllers', 'angular-storage', 'ngCordova', 'ngMap', 'ngMessages', 'ionic-material', 'ionMdInput', 'tabSlideBox', 'chart.js'])

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

// A simple relative timestamp filter
.filter('relativets', function() {
    return function(value) {
        var now = new Date();
        var diff = now - value;

        // ms units
        var second = 1000;
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var year = day * 365;
        var month = day * 30;

        var unit = day;
        var unitStr = 'd';
        if (diff > year) {
            unit = year;
            unitStr = 'y';
        } else if (diff > day) {
            unit = day;
            unitStr = 'd';
        } else if (diff > hour) {
            unit = hour;
            unitStr = 'h';
        } else if (diff > minute) {
            unit = minute;
            unitStr = 'm';
        } else {
            unit = second;
            unitStr = 's';
        }

        var amt = Math.ceil(diff / unit);
        return amt + '' + unitStr;
    }
})

.directive('activePageHighlight', ['$rootScope', '$state', function($rootScope, $state) {

    return function($scope, $element, $attr) {

        function checkUISref() {
            if ($state.is($attr['uiSref'])) {
                $element.addClass('active-page-highlight');
            } else {
                $element.removeClass('active-page-highlight');
            }
        }
        checkUISref();

        $rootScope.$on('$stateChangeSuccess', function() {
            checkUISref();
        })
    };

}])

.factory('socket', function(socketFactory) {
    //Create socket and connect to http://chat.socket.io
    var myIoSocket = io.connect('http://localhost:9999/');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})

.config(function($stateProvider, $urlRouterProvider, $provide) {
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    }).state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: 'logincontroller'
    }).state('app.managerList', {
        url: '/managerList',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/managerList.html',
                controller: 'managerListCtrl'
            }
        }


        }).state('app.manager_Joblist', {
        url: '/manager_Joblist',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/manager_Joblist.html',
                controller: 'Trucklist_managerCtrl'
            }
        }

        })

        .state('app.manager_jobDetails', {
        url: '/manager_jobDetails/:Id/:Name',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/manager_jobDetails.html',
                controller: 'TrucklistCtrl'
            }
        }

        })

    .state('app.browse_trucklist', {
            url: '/managerList/:Id/:Name/:UserId/:Company_name/:profile_image',
            cache: false,
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
                controller: 'Trucklist_managerCtrl'
            }
        }
    }).state('app.manager_Joblist.created_job', {
        url: '/created_job',
        views: {
            'app-manager_Joblist-created_job': {
                templateUrl: 'templates/created_job.html',
                controller: ''
            }
        }
    })
      .state('app.createdjob_form', {
        url: '/createdjob_form',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/createdjob_form.html',
                controller: ''
            }
        }
    })
    .state('app.manager_Joblist.ongoing_truck', {
        url: '/ongoing_truck',
        views: {
            'app-manager_Joblist-ongoing_truck': {
                templateUrl: 'templates/ongoing_truck.html',
                controller: ''
            }
        }
    }).state('app.truckDetails', {
        url: '/truckDetails/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/truckDetails.html',
                controller: 'detailsCtrl'
            }
        }
    }).state('app.trackTruck', {
        url: '/trackTruck',
        views: {
            'menuContent': {
                templateUrl: 'templates/trackTruck.html',
                controller: 'trackTruckCtrl'
            }
        }
    }).state('app.take_photo', {
        url: '/take_photo',
        views: {
            'menuContent': {
                templateUrl: 'templates/take_photo.html',
                controller: 'takePhoto'
            }
        }
    }).state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    // $provide.decorator('movieTitle', function($delegate) {
    //     return $delegate + ' - starring Keanu Reeves';
    // });
})
