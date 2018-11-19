angular.module('xfAPP.services', [])
	
   
     //待审批任务
    .service('myApprove',function ($q,$http) {
        return{
            myAppre:function(par){
   
                var deferred=$q.defer();
                var promise = deferred.promise;
                var  param=encodeURI(par);
                var url='';
                if(settingModel.isDebug){
                    url = serviceUrl.debug.myApproveUrl;
                }else{
                    url= serviceUrl.nomal.getPostUrl();

                }
              
            	var token = sessionStorage.getItem("_Token1");
                var postCfg = {
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf8',
                    	'_Token1':token}
                    
                };
               
              
                $http.post(url,param,postCfg).success(function (data) {
                	console.log(data);
                    deferred.resolve(data);
                    console.log("--get ApplicationInfoService  GetBusinessInfo SUCC" + url);

                })
                    .error(function(data) {
                        deferred.reject(data);
                        console.log("---ApplicationInfoService get data ERROR");
                    });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return  promise;
            }
        }

    })
     //流转信息详情
    .service('circulation',function ($q,$http) {
        return{
            circulate:function(par){
                console.log("--start ApplicationInfoService--");
                var deferred=$q.defer();
                var promise = deferred.promise;
                var  param= par;
                var url='';
                if(settingModel.isDebug){
                    url = serviceUrl.debug.circulateUrl;
                }else{
                    url= serviceUrl.nomal.getPostUrl();

                }
                var token = sessionStorage.getItem("_Token1");
                var postCfg = {
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf8',
                    	'_Token1':token}
                    
                };
//                var postCfg = {
//                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                    transformRequest: function (param) {
//                        return $.param(param);
//                    }
//                };
                $http.post(url,param,postCfg).success(function (data) {
                	console.log(data);
                    deferred.resolve(data);
                    console.log("--get ApplicationInfoService  GetBusinessInfo SUCC" + url);

                })
                    .error(function(data) {
                        deferred.reject(data);
                        console.log("---ApplicationInfoService get data ERROR");
                    });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return  promise;
            }
        }

    })
     //审批处理
    .service('approvePend',function ($q,$http) {
        return{
            pend:function(handle){
                console.log("--start ApplicationInfoService--");
                var deferred=$q.defer();
                var promise = deferred.promise;
                var  param= serviceUrl.param.getApprovePendParam();
                var url='';
                if(settingModel.isDebug){
                    url = serviceUrl.debug.approvePendUrl;
                }else{
                    url= serviceUrl.nomal.getPostUrl();

                }
                var token = sessionStorage.getItem("_Token1");
                var postCfg = {
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf8',
                    	'_Token1':token}
                    
                };
                $http.post(url,param,postCfg).success(function (data) {
                	console.log(data);
                    deferred.resolve(data);
                    console.log("--get ApplicationInfoService  GetBusinessInfo SUCC" + url);

                })
                    .error(function(data) {
                        deferred.reject(data);
                        console.log("---ApplicationInfoService get data ERROR");
                    });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return  promise;
            }
        }

    })
    //申请信息
    .service('applyInfo',function ($q,$http) {
        return{
            apply:function(handle){
                console.log("--start ApplicationInfoService--");
                var deferred=$q.defer();
                var promise = deferred.promise;
                var  param= handle;
                var url='';
                if(settingModel.isDebug){
                    url = serviceUrl.debug.applyInfoUrl;
                }else{
                    url= serviceUrl.nomal.getPostUrl();

                }
                var token = sessionStorage.getItem("_Token1");
                var postCfg = {
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf8',
                    	'_Token1':token}
                    
                };
                $http.post(url,param,postCfg).success(function (data) {
                	console.log(data);
                    deferred.resolve(data);
                    console.log("--get ApplicationInfoService  GetBusinessInfo SUCC" + url);

                })
                    .error(function(data) {
                        deferred.reject(data);
                        console.log("---ApplicationInfoService get data ERROR");
                    });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return  promise;
            }
        }

    })
    //审批单处理通过、终止、回退
    .service('handleApprove',function ($q,$http) {
        return{
            approve:function(handle){
                console.log("--start ApplicationInfoService--");
                var deferred=$q.defer();
                var promise = deferred.promise;
                var  param= handle;
                var url='';
                if(settingModel.isDebug){
                    url = serviceUrl.debug.handleApproveUrl;
                }else{
                    url= serviceUrl.nomal.getPostUrl();

                }
                var token = sessionStorage.getItem("_Token1");
                var postCfg = {
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf8',
                    	'_Token1':token}
                    
                };
                $http.post(url,param,postCfg).success(function (data) {
                    deferred.resolve(data);
                    console.log("--get ApplicationInfoService  GetBusinessInfo SUCC" + url);

                })
                    .error(function(data) {
                        deferred.reject(data);
                        console.log("---ApplicationInfoService get data ERROR");
                    });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return  promise;
            }
        }

    })