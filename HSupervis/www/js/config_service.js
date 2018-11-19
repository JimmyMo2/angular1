
'use strict';
var serviceUrl = {//挡板数据
    debug:{
        loginUrl : 'data/homepage-1.data',
        myApproveUrl:'data/myApprove.data',
        circulateUrl:'data/circulation.data',
        handleApproveUrl:'data/handleApprove.data',
        applyInfoUrl:'data/applyInfo.data'
    },
    nomal:{//所有提交地址，在提交callpu项目后，项目组会修改访问地址

        getGetUrl:function () {
            var  getUrl = '/meeting/OtherGet.do';
            return getUrl;
        },
        getPostUrl:function () {
            var postUrl= '/meeting/OtherEsbAction.do'
//          var postUrl= '/meeting/goodService/post/1/1'
            return postUrl;
        }
    },
    param:{
        // ++++++++post请求参数范例
        postupdateUrl:function (info) {//更改登记记录url
            var infoStr = changinfo(info);
            var param = {"params":"{'key':'UPDATE','content':"+infoStr+"}",
                serviceName: serviceUrl.getServiceName()}
            return param;
        },
       // +++++++
       //  首页分类
        getHomepageParam:function () {
            var param = {"params":"{'key':'GET_KIND'}", serviceName: serviceUrl.getServiceName()}
            return param;
        },
        GetParas:function (paras){
        	var para="params=" + paras + "&EmployeeNo=''&SrvicName1=MAS";
        	return para;
        },
        //待审批任务
        getMyApproveParam:function (empId) {
            var param = {"params":"{'key':'GET_KIND','empId':'"+empId+"'}", serviceName: serviceUrl.getServiceName()}
            return param;
        },
        //流转信息
        getCirculateParam:function () {
            var param = {"params":"{'key':'GET_KIND'}", serviceName: serviceUrl.getServiceName()}
            return param;
        },
        //申请信息
        getApplyInfoParam:function (handle) {
            var param = {"params":"{'key':'GET_KIND','empId':'"+handle.empId+"','pcsInstncId':"+handle.pcsInstncId+"}", serviceName: serviceUrl.getServiceName()}
            return param;
        },
        ////审批单处理通过、终止、回退
        getHandleApproveParam:function (handle) {
            var param = {"params":"{'key':'GET_GOODS_ID_LIST_BY_SEACH_AND_KIND','pcsInstncId':'"+handle.pcsInstncId+"','operateFlg':"+handle.operateFlg+",'pk_asset_clause_key':"+handle.pk_asset_clause_key+",'taskId':"+handle.taskId+",'comment':"+handle.comment+",'replyComment':"+handle.replyComment+",'empId':'"+handle.empId+"','prevAvyInstncId':'"+handle.prevAvyInstncId+"'}", serviceName: serviceUrl.getServiceName()}
            return param;
        }
       


    },

    getServiceName:function () {
//      return sessionStorage.serviceName;
           return sessionStorage.getItem("username");
    }

};



