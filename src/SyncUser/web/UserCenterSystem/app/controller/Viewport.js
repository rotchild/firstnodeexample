Ext.define('UserCenterSystem.controller.Viewport', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            '#mainViewPort': {
                'render': function () {
                    this.UserCheck();
                }
            }
        });
    },
    //用户Session检测
    UserCheck: function () {
        //debugger;
        Ext.getCmp('mainViewPort').getEl().mask("正在获取用户信息，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/UserCenterSystem/UserCheck',
            params: {
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                //debugger;
                console.log("111");
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert("提示", result.err.message);
                    window.location.href = "/";
                } else {

                    PublicObject.CurrentUser = result.data;

                    //var consoleDay = new Date();
                    //document.getElementById('divUserInfo').innerHTML = "" +
                    //'<br />' +
                    //result.data.realname + " | <a style='color:#ffffff;text-decoration:none;' href='#' onclick='UserCheckOut()'>退出</a>" +
                    //' <br/>' +
                    //consoleDay.getFullYear() + '年' + (consoleDay.getMonth() + 1) + '月' + consoleDay.getDate() + '日';

                    document.getElementById('divUserInfo').innerHTML = "" +
                    '<br />' +
                    result.data.realname +
                    ' <br/>' +
                    "<a style='color:#ffffff;text-decoration:none;' href='#' onclick='createModifyPassWordFormPanel()'>修改密码</a> | " +
                    "<a style='color:#ffffff;text-decoration:none;' href='#' onclick='UserCheckOut()'>退出</a>";

                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                window.location.href = "/";
            }
        });
    }
});