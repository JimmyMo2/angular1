// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('xfAPP', ['ionic', 'xfAPP.controllers', 'xfAPP.services'])
.run(function($ionicPlatform) {
  
   sessionStorage.setItem("pageSize",2);
   sessionStorage.setItem("empid","00005025");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
 .constant("INTROHEIGHT",window.innerHeight)
 .constant("VERSION",ionic.version)

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,VERSION) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $ionicConfigProvider.views.swipeBackEnabled(false);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  
  
  $stateProvider
   .state("app", {
     url: "/app",
     abstract: true,
     templateUrl: "views/tabs.html"
   })

      //拍卖首页
   .state("app.homepage", {
     url: "/homepage",
     cache: false,
     views: {
       "tab-home": {
         templateUrl: "views/homepage.html",
         controller:"HomepageCtrl"
       }
     }
   })
     
   .state("app.approvelist", {
     url: "/approvelist",
     cache: false,
     views: {
       "tab-approve": {
         templateUrl: "views/approvelist.html",
         controller:"approvelistCtrl"
       }
     }
   })
			// .state('homepage', {
      //   url: '/homepage',
      //   cache:true,
      //   templateUrl: 'views/homepage.html',
      //   controller:"HomepageCtrl"
      // })
			.state('detail', {
        url: '/detail?pcsInstncId',
        cache:true,
        templateUrl: 'views/detail.html',
        controller:"detailCtrl"
      })
        //我的发布--wenlo--2017-7-28
      .state('mypublic', {
        url: '/mypublic?pcsInstncId',
        cache:true,
        templateUrl: 'views/mypublic.html',
        controller:"mypublicCtrl"
      })
    $urlRouterProvider.otherwise('/app/homepage');
     
     
    

      
      
      
     

  // if none of the above states are matched, use this as the fallback
//$urlRouterProvider.otherwise('/app/homepage');


});
