/**
 * 登录验证
 */
var App = {
    init : function(require) {
//		App.pageA = $("#pageA");
        //	YT.showPageArea(App.pageA, [], true);
        App.getHeight();
        App.initClick();
        App.initJson();
        App.StateListen();

    },
    //初始化点击事件
    initClick:function(){

    },
    //获取设备高度 自适应
    getHeight:function(){


    },
    //初始化页面 查询数据
    initJson:function(){
        var serviceName = App.getQueryString('SrvicName1');
    
        if ((!serviceName) || serviceName == '' || typeof serviceName == undefined  || serviceName == null) {
            serviceName = 'error';
        }
        sessionStorage.serviceName = serviceName;
        //成功后回调函数
        var _success = function (result) {
            // 验证效验码
            UPCHAT.M.NAPI.dismiss();
            if (result.status == '0') {
                var data = {otherQueryParam: 'test', code: result.security.replace(/=/g,"卍"),SrvicName1:serviceName};
                // var data = {otherQueryParam: 'test', code: result.security.replace(/=/g,"卍"),serviceName:serviceName};
                $.ajax({
                    url:'/meeting/CheckSecurityForEsbOther.do',
                    type:'POST', //GET
                    async:true,    //或false,是否异步
                    data:data,
                    timeout:5000,    //超时时间
                    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    success:function(data,textStatus,jqXHR) {
                        try {
                            var name = data.content;
                             sessionStorage.setItem("parameters", name);
                            sessionStorage.setItem("empId", data.empId);
                            sessionStorage.setItem("_Token1", data._Token1);
                        }catch (e){
                            alert('获取姓名错误');
                        }
                        //执行成功,准备跳转
                        self.location='./HSupervis/www/index.html';

                    },
                    error:function(xhr,textStatus){
                        alert('服务器处理超时，请重新登录!');
                    },
                    complete:function(data){

                    }
                })
            }
        };

        //失败后回调函数
        var _fail = function (fal) {
            alert("安全验证失败,清退出程序重试!");
            UPCHAT.M.NAPI.dismiss();
           // toApp();
        };
        //获取效验码
        var getCheckCode = function () {
            UPCHAT.M.NAPI.showLoadingView();
            UPCHAT.M.NAPI.getSecurity(_success, _fail);
        };

        //非U聊客户端打开
        var toApp = function () {
            $(".demo-container").css("display", "block");
            var html = '<label>请用最新版CALL 浦客户端打开该界面</label><br />' +
                '<a href="https://upchat.95516.net/app/">CALL浦客户端下载</a>';
            $(".demo-container").html(html);
        };

        if (UPCHAT.M.isNative()) {
            UPCHAT.M.init(getCheckCode);
        } else {
            UPCHAT.M.init(getCheckCode);
        }
    },
    getQueryString:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
  //阻止首页在往后返回
    State:function(title,url){//无刷新改变URL
        if(window.history.pushState){
            window.history.pushState({title:title,url:url},title,url);
        }else{
            location.href=url;
        }
    },
    StateListen:function(){//监听地址
        App.State("checkSecurity","checkSecurity.html");
        var url=location.href.toString();
        window.addEventListener('popstate', function(e){
            // alert('location: ' + document.location);
            // alert('state: ' + JSON.stringify(e.state));
            if (e.state.url && e.state.url.indexOf("checkSecurity")!=-1){
                UPCHAT.M.NAPI.closeWebView(window.location.href);
            }
        },false);
    }
};


