// angular.module('xfAPP.controllers', [])
angular.module('xfAPP.controllers', [])
	
    // 闲置拍卖首页
    .controller('HomepageCtrl', function ($ionicPopup,$ionicLoading,$ionicHistory,$ionicSlideBoxDelegate,$scope,$state,myApprove,$ionicModal) {
//       $scope.h = Math.min(document.documentElement.clientHeight, window.innerHeight) - 44 - 50;
         
    	 $ionicLoading.show({
             template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">数据加载中...</p>',
             animation: 'fade-in',
             showBackdrop: false,
             maxWidth: 200,
             showDelay: 0
		 });
		 
		 	$scope.search = function(list){
			alert("11111111")
			console.log(list)
			$scope.modal.hide()
		}

		$ionicModal.fromTemplateUrl('templates/modal.html',{
			scope:$scope,
			animation:'slide-in-up'
		}).then(function(modal){
			$scope.modal = modal
			console.log(222)
		})
        //只限于本地测试
//         sessionStorage.setItem("username", 'jinl3');
    	//获取empId
//    	var empId = "99999976";
		////////////////////待审批/////////////////////
//    	sessionStorage.setItem("empid", "11001173");
    	var empId = sessionStorage.getItem("empid");
    	var params = "{'RuleName':'todoTaskListQuery','Parm':'','IntType':'method'}";
    	var param =serviceUrl.param.GetParas(params);

    	myApprove.myAppre(param).success(function (data) {
//    		alert(typeof data.ReturnCd);
   		// alert(JSON.stringify(data));
    		$ionicLoading.hide();

    		if(data.ReturnCd=="1" || data.ReturnCd==1 ){
console.log(data)
    			$scope.myApproves=data.RspMsg;
    		}else{
    			 $ionicLoading.show({
    	             template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">请求数据异常</p>',
    	             animation: 'fade-in',
    	             showBackdrop: false,
    	             maxWidth: 200,
    	             duration:2000,
    	             showDelay: 0
    	         });
    		}
    		
    		
			
        }).error(function (data) {
    
            loading.hide($ionicLoading);
            showAlert($ionicPopup,"服务器请求失败");
        })
        
        $scope.goDetail=function(par){
        	$ionicHistory.clearCache().then(function() {
 				$state.go("detail",{
 					"pcsInstncId":par
 				});
			});
        }
		
        $scope.handle=function(date){
        	console.log('handle');
        	console.log(date);
        	$scope.applyParam=date;
        	$ionicSlideBoxDelegate.next();
        }
        
        $scope.backForword=function(){
            history.go(-1);
        }

    })
    //详情
    .controller('detailCtrl', function ($location,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup,$timeout,applyInfo,myApprove,handleApprove,applyInfo,approvePend) {
    	$scope.h = Math.min(document.documentElement.clientHeight, window.innerHeight);
    	$scope.myApproveLists={};
    
        $scope.backForword=function(){
            history.go(-1);
        }
        $ionicLoading.show({
            template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">数据加载中...</p>',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0
        });
        var empId = sessionStorage.getItem("empid");
         //申请信息
//        var myapply={
//        	"empId":empId,
//        	"pcsInstncId":$location.search().pcsInstncId
//        }
        var id = {
        		pcsInstncId:$location.search().pcsInstncId
        }
        var p = JSON.stringify(id);
        var params = "{'RuleName':'approvalDetail','Parm':'"+p+"','IntType':'method'}";
        var param =serviceUrl.param.GetParas(params);
//        alert(param);
        applyInfo.apply(param).success(function (data) {
			// alert(JSON.stringify(data));
       
//			$scope.pends=data.approvalInfo;
        	 $ionicLoading.hide();

        	if(data.ReturnCd=="1" || data.ReturnCd==1){
        		$scope.pends=data.RspMsg;
				$scope.myApproveLists.comment=$scope.pends.comment;
				$scope.myApproveLists.replyComment=$scope.pends.replyComment;
    		}else{
    			 $ionicLoading.show({
	   	             template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">请求数据异常</p>',
	   	             animation: 'fade-in',
	   	             showBackdrop: false,
	   	             maxWidth: 200,
	   	             duration:2000,
	   	             showDelay: 0
	   	         });
    		}
        	
        	
			
        }).error(function (data) {
            loading.hide($ionicLoading);
            showAlert($ionicPopup,"服务器请求失败");
        })
        
        //  历史流转   
        $scope.goHistory=function(){
        	$ionicHistory.clearCache().then(function() {
 				$state.go("mypublic",{
 					"pcsInstncId":$location.search().pcsInstncId
 				});
			 });
        }
        
        //通过功能
        $scope.pass=function(){
        	$ionicLoading.show({
                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">处理中请稍等</p>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        	//参数operateFlg --0：通过，1：退回，2：终止
        	var param1={
        		"pcsInstncId":$scope.pends.pcsInstncId,
        		"operateFlg":"0",
        		"pk_asset_clause_key":$scope.pends.pk_asset_clause_key,
        		"taskId":$scope.pends.taskId,
        		"comment":$scope.myApproveLists.comment,
        		"replyComment":$scope.myApproveLists.replyComment,
        		"empId":empId,
        		"prevAvyInstncId":$scope.pends.prevAvyInstncId
        	}
        	var p = JSON.stringify(param1);
        	var params = "{'RuleName':'taskApprove','Parm':'"+p+"','IntType':'method'}";
        	var param = serviceUrl.param.GetParas(params);
//        	alert(param);
        	handleApprove.approve(param).success(function (data) {
        		$ionicLoading.hide();
				console.log(data);
			
				
				//0：失败，1：成功
				if(data.ReturnCd=="1" || data.ReturnCd==1){
				  
				   $ionicLoading.show({
		                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">通过处理成功</p>',
		                animation: 'fade-in',
		                showBackdrop: false,
		                maxWidth: 200,
		                showDelay: 0,
		                duration:2000
		            });
				   $timeout(function(){
					  $ionicHistory.clearCache().then(function(){
			 				$state.go("homepage");
					  })
				   },2000);
					
					
//					showAlert3($ionicPopup,data.RspMsg.msg,goHome);
				}else{
//					loading.hide($ionicLoading);
//	            	showAlert($ionicPopup,data.RspMsg.msg);
					 $ionicLoading.show({
			                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">通过处理失败</p>',
			                animation: 'fade-in',
			                showBackdrop: false,
			                maxWidth: 200,
			                showDelay: 0,
			                duration:2000
			            });
					   $timeout(function(){
						  $ionicHistory.clearCache().then(function(){
				 				$state.go("homepage");
						  })
					   },2000);
				}
	        }).error(function (data) {
	        	
//	            loading.hide($ionicLoading);
	            showAlert($ionicPopup,"服务器请求失败");
	        })
        }
        //终止功能
        $scope.stop=function(){
        	$ionicLoading.show({
                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">处理中请稍等</p>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        	var param1={
        		"pcsInstncId":$scope.pends.pcsInstncId,
        		"operateFlg":"1",
        		"pk_asset_clause_key":$scope.pends.pk_asset_clause_key,
        		"taskId":$scope.pends.taskId,
        		"comment":$scope.myApproveLists.comment,
        		"replyComment":$scope.myApproveLists.replyComment,
        		"empId":empId,
        		"prevAvyInstncId":$scope.pends.prevAvyInstncId
        	}
        	var p = JSON.stringify(param1);
        	var params = "{'RuleName':'taskApprove','Parm':'"+p+"','IntType':'method'}";
        	var param =serviceUrl.param.GetParas(params);
        	//参数operateFlg --0：通过，1：退回，2：终止
        	handleApprove.approve(param).success(function (data) {
				console.log(data);
				$ionicLoading.hide();
				//0：失败，1：成功
				if(data.ReturnCd=="1" || data.ReturnCd==1){
					$ionicLoading.show({
		                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">终止成功</p>',
		                animation: 'fade-in',
		                showBackdrop: false,
		                maxWidth: 200,
		                showDelay: 0,
		                duration:2000
		            });
				   $timeout(function(){
					  $ionicHistory.clearCache().then(function(){
			 				$state.go("homepage");
					  })
				   },2000);
				}else{
//					loading.hide($ionicLoading);
//	            	showAlert($ionicPopup,data.RspMsg.msg);
					 $ionicLoading.show({
			                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">终止失败</p>',
			                animation: 'fade-in',
			                showBackdrop: false,
			                maxWidth: 200,
			                showDelay: 0,
			                duration:2000
			            });
					   $timeout(function(){
						  $ionicHistory.clearCache().then(function(){
				 				$state.go("homepage");
						  })
					   },2000);
				}
	        }).error(function (data) {
	            loading.hide($ionicLoading);
	            showAlert($ionicPopup,"服务器请求失败");
	        })
        }
         //回退功能
        $scope.back=function(){
			console.log(222)
        	$ionicLoading.show({
                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">处理中请稍等</p>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        	var param1={
        		"pcsInstncId":$scope.pends.pcsInstncId,
        		"operateFlg":"2",
        		"pk_asset_clause_key":$scope.pends.pk_asset_clause_key,
        		"taskId":$scope.pends.taskId,
        		"comment":$scope.myApproveLists.comment,
        		"replyComment":$scope.myApproveLists.replyComment,
        		"empId":empId,
        		"prevAvyInstncId":$scope.pends.prevAvyInstncId
        	}
        	var p = JSON.stringify(param1);
        	var params = "{'RuleName':'taskApprove','Parm':'"+p+"','IntType':'method'}";
        	var param =serviceUrl.param.GetParas(params);
        	//参数operateFlg --0：通过，1：退回，2：终止
        	handleApprove.approve(param).success(function (data) {
				console.log(data);
				$ionicLoading.hide();
				//0：失败，1：成功
				if(data.ReturnCd=="1" || data.ReturnCd==1){
					$ionicLoading.show({
		                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">回退成功</p>',
		                animation: 'fade-in',
		                showBackdrop: false,
		                maxWidth: 200,
		                showDelay: 0,
		                duration:2000
		            });
				    $timeout(function(){
					  $ionicHistory.clearCache().then(function(){
			 				$state.go("homepage");
					  })
				   },2000);
				}else{
//					loading.hide($ionicLoading);
//	            	showAlert($ionicPopup,data.RspMsg.msg);
					 $ionicLoading.show({
			                template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">回退失败</p>',
			                animation: 'fade-in',
			                showBackdrop: false,
			                maxWidth: 200,
			                showDelay: 0,
			                duration:2000
			            });
					   $timeout(function(){
						  $ionicHistory.clearCache().then(function(){
				 				$state.go("homepage");
						  })
					   },2000);
				}
	        }).error(function (data) {
	            loading.hide($ionicLoading);
	            showAlert($ionicPopup,"服务器请求失败");
	        })
        }
         
    })
    
   //我的发布    --查看我发布的商品
    .controller('mypublicCtrl', function ($location,$scope,$state,$ionicLoading,$ionicPopup,circulation) {
    	 $scope.isInfo=false;

    	//加载等待框
//      $ionicLoading.show({
//      	template:'<ion-spinner icon="ios" class="spinner-calm"></ion-spinner>'
//      })
    	 $ionicLoading.show({
             template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">数据加载中...</p>',
             animation: 'fade-in',
             showBackdrop: false,
             maxWidth: 200,
             showDelay: 0
         });
    	
//      sessionStorage.setItem("empid", "8888");//只限于本地测试
        var empid=sessionStorage.getItem("empid");//获取登陆人id
//      var empid="99999971"//只限于本地测试
        var id = {
        		pcsInstncId:$location.search().pcsInstncId
        }
        var p = JSON.stringify(id);
        var params = "{'RuleName':'avyTransferQuery','Parm':'"+p+"','IntType':'method'}";
//        var params = "{'RuleName':'avyTransferQuery','Parm':{'pcsInstncId':" + $location.search().pcsInstncId+ "},'IntType':'method'}";
        var param =serviceUrl.param.GetParas(params);

    	
		circulation.circulate(param).success(function (data) {
			console.log(data);
			$ionicLoading.hide();
//			$scope.circulates=data.taskInf;
		
			if(data.ReturnCd=="1" || data.ReturnCd==1){
				$scope.circulates=data.RspMsg;
				$scope.circulates.forEach(function(k,v){
					k.isInfo=false;
				})
    		}else{
    			 $ionicLoading.show({
	   	             template:'<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><p class="positive">请求数据异常</p>',
	   	             animation: 'fade-in',
	   	             showBackdrop: false,
	   	             maxWidth: 200,
	   	             duration:2000,
	   	             showDelay: 0
	   	         });
    		}
			
        }).error(function (data) {
            loading.hide($ionicLoading);
            showAlert($ionicPopup,"服务器请求失败");
        })
//     
        $scope.backForword=function(){
            history.go(-1);
        }
       
        $scope.showDetail=function(circulate){
        	circulate.isInfo=!circulate.isInfo;
        }
        
       
	})

	//我的发布    --查看我发布的商品
    .controller('approvelistCtrl', function ($location,$scope,$state,$ionicLoading,$ionicPopup,$ionicModal) {
		$scope.searchList = { name:'',bank:'',status:'',approvalstatus:'',category:''};

		// $scope.modal;

	   $scope.search = function(list){
		   alert("11111111")
		   console.log(list)
		   $scope.modal.hide()
	   }
	  
	   $ionicModal.fromTemplateUrl('templates/modal.html',{
		   scope:$scope,
		   animation:'slide-in-up'
	   }).then(function(modal){
		   $scope.modal = modal
	   })

	   $scope.$on('$destroy',function(){
		   $scope.modal.remove()
	   })


	//    $scope.selected=[];
	//    $scope.selectedTags=[];
	//    $scope.users = [{id:1,name:"11",displayName:'111'},{id:2,name:"2",displayName:'222'}]
	//    var updateSelected = function(action,id,name){
	// 	   if(action =='add' && $scope.selected.indexOf(id) === -1){
	// 		   $scope.selected.push(id)
	// 		   $scope.selectedTags.push(name)
	// 	   }
	// 	   if(action =='remove' && $scope.selected.indexOf(id) !== -1){
	// 		   var idx =$scope.selected.indexOf(id)
	// 		   $scope.selected.splice(idx,1);
	// 		   $scope.selectedTags.splice(idx,1);
	// 	   }
	//    }
	//    $scope.updateSelection = function($event,id){
	// 	   var ch = $event.target;
	// 	   var ac = (ch.checked ?'add':'remove');
	// 	   updateSelected(action,id,ch.name)
	//    }
   })
	
    
    
    
    
   
    
   

