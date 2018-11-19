'use strict';

//签到弹窗
var showAlert = function(ionicPopup,message) {
  var alertPopup = ionicPopup.alert({
    title: '消息',
    template:message
  });
};
// var showAlert1 = function(ionicPopup,message) {
//   var alertPopup = ionicPopup.alert({
//     title: '消息',
//     template:message
//   });
//   alertPopup.then(function(res) {
//     history.back('list.html');
//   });
// };
// var showAlert1 = function(ionicPopup,message) {
//   var alertPopup = ionicPopup.alert({
//     title: '消息',
//     template:message
//   });
//   alertPopup.then(function(res) {
//     history.back(-1);
//   });
// };
var formatDateTime=function (date) {
  var h = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  second = second<10?('0'+second):second;
  minute = minute<10?('0'+minute):minute;
  return h+':'+minute+':'+second;
};

// var  showloading = function( ionicLoading) {
//   ionicLoading.show({
//     content: 'Loading',
//     animation: 'fade-in',
//     showBackdrop: false,
//     maxWidth: 300,
//     //template: 'Loading...',
//     showDelay: 0
//   });
//
// };
// var hideloading = function(ionicLoading){
//   ionicLoading.hide();
// };
//
// /*本地存储*/
// var storage =
// {
//   //获取对象
//   get: function (n, proc) {
//
//     var v = localStorage.getItem(n);
//     try {
//       proc(v ? JSON.parse(v) : v);
//     }
//     catch (e) {
//       proc(v);
//     }
//   },
//
//   set: function (n, v) {
//
//     if (v) {
//       //obj转string
//       localStorage.setItem(n, (typeof(v) == "string") ? v : JSON.stringify(v));
//     }
//     else {
//       localStorage.removeItem(n);
//     }
//   }
//
// }
// //截取？参数
//
// function GetRequest() {
//
//   var url = location.search; //获取url中"?"符后的字串
//   var theRequest = new Object();
//   if (url.indexOf("?") != -1) {
//     var str = url.substr(1);
//    var strs = str.split("&");
//     for(var i = 0; i < strs.length; i ++) {
//       theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
//     }
//   }
//   return theRequest;
// }
