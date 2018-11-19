'use strict';

var settingModel={
    isDebug:true
};
var loading={
    show:function (ionicLoading) {
        ionicLoading.show({
            template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">数据加载中</p>',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0
        });
    },
    hide:function (ionicLoading) {
        ionicLoading.hide();
    }
}
var showAlert = function(ionicPopup,message) {
    var alertPopup = ionicPopup.alert({
        title: '系统提示',
        template:message,
        buttons:[
            {
                text: '确定',
                type:'button-positive',
                style:"text-align:center",
                onTap:function (e) {


                }
            }]
    });
};
var showAlert1 = function(ionicPopup,message) {
    var alertPopup = ionicPopup.alert({
        title: '系统提示',
        template:message,
        buttons:[
            {
                text: '确定',
                type:'button-positive',
                style:"text-align:center",
                onTap:function (e) {
                }
            }]
    });
};
var showAlert2 = function(ionicPopup,message) {
    var alertPopup = ionicPopup.alert({
        title: '系统提示',
        template:message,
        buttons:[
            {
                text: '确定',
                type:'button-positive',
                style:"text-align:center",
                onTap:function (e) {
                }
            }]
    });
};
var showAlert3 = function(ionicPopup,message,goNext) {
    var alertPopup = ionicPopup.alert({
        title: '系统提示',
        template:message,
        buttons:[
            {
                text: '确定',
                type:'button-positive',
                style:"text-align:center",
                onTap:function (e) {
                	goNext();
                }
            }]
    });
};

