//重写trim()
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

var PublicObject = {
    pageSize: 50,
    ajaxTimeout: 300000,

    CurrentUser: {},//当前登录的用户

    selecTreeData: {},//选择的树节点
    ExcelData: [],//预览Excel数据
    selectUser: {},//推广员管理 选中的数据
    selectPublicUser: {},//注册会员管理 选中的数据
    selectLoginUser: {},//管理员管理 选中的数据

    AreaRecord: {},//选中的区域record
    AreaGrid: {}//选中的区域Grid

};

function ExcelData(Data) {
    //debugger;

    //var ExcelData = Data.data[0].data;
    //
    //var date = new Date(Date.UTC(1899, 11, 30)).getTime();//-2209161600000
    //
    //var store = Ext.getStore("ExcelData");
    //
    //store.removeAll();
    //
    //PublicObject.ExcelData = [];

    var date = new Date(Date.UTC(1899, 11, 30)).getTime();//-2209161600000

    var store = Ext.getStore("ExcelData");

    store.removeAll();

    PublicObject.ExcelData = [];

    var ExcelData = "";

    var data = "";

    var rec = "";

    if (Data.data.worksheets == undefined) {

        ExcelData = Data.data[0].data;

        for (var i = 1; i < ExcelData.length; i++) {
            //debugger;
            data = ExcelData[i];

            //debugger;
            //return;

            //var _policydate = formatDate(new Date(data[4].value.toString().trim()), "yyyy-MM-dd hh:mm:ss");
            //_policydate = new Date(_policydate).getTime().toString().substr(0, 10);

            rec = {
                //id: i,
                areaid: data[0].toString().trim(),
                username: data[3].toString().trim(),
                usermd5: hex_md5(data[3].toString().trim()),
                realname: data[4].toString().trim(),
                usertel: data[6].toString().trim()
            };

            ////判断是否为undefined
            //for (var j in rec) {
            //    if (rec[j] == undefined) {
            //        rec[j] = "";
            //    }
            //}

            PublicObject.ExcelData[PublicObject.ExcelData.length] = rec;
            store.insert(store.getCount(), rec);
            store.commitChanges();
        }
    } else {

        ExcelData = Data.data.worksheets[0].data;

        for (var k = 1; k < ExcelData.length; k++) {
            //debugger;
            data = ExcelData[k];

            //debugger;
            //return;

            //var _policydate = formatDate(new Date(data[4].value.toString().trim()), "yyyy-MM-dd hh:mm:ss");
            //_policydate = new Date(_policydate).getTime().toString().substr(0, 10);

            rec = {
                //id: i,
                areaid: data[0].value.toString().trim(),
                username: data[3].value.toString().trim(),
                usermd5: hex_md5(data[3].value.toString().trim()),
                realname: data[4].value.toString().trim(),
                usertel: data[6].value.toString().trim()
            };

            ////判断是否为undefined
            //for (var j in rec) {
            //    if (rec[j] == undefined) {
            //        rec[j] = "";
            //    }
            //}

            PublicObject.ExcelData[PublicObject.ExcelData.length] = rec;
            store.insert(store.getCount(), rec);
            store.commitChanges();
        }
    }
}

//function ExcelData(Data) {
//    //debugger;
//    var ExcelData = Data.data[0].data;
//
//    var date = new Date(Date.UTC(1899, 11, 30)).getTime();//-2209161600000
//
//    var store = Ext.getStore("ExcelData");
//
//    store.removeAll();
//
//    PublicObject.ExcelData = [];
//
//    for (var i = 1; i < ExcelData.length; i++) {
//        //debugger;
//        var data = ExcelData[i];
//
//        //debugger;
//        //return;
//
//        //var _policydate = formatDate(new Date(data[4].value.toString().trim()), "yyyy-MM-dd hh:mm:ss");
//        //_policydate = new Date(_policydate).getTime().toString().substr(0, 10);
//
//        var rec = {
//            //id: i,
//            areaid: data[0].toString().trim(),
//            username: data[3].toString().trim(),
//            usermd5: hex_md5(data[3].toString().trim()),
//            realname: data[4].toString().trim(),
//            usertel: data[6].toString().trim()
//        };
//        //判断是否为undefined
//        for (var j in rec) {
//            if (rec[j] == undefined) {
//                rec[j] = "";
//            }
//        }
//        PublicObject.ExcelData[PublicObject.ExcelData.length] = rec;
//        store.insert(store.getCount(), rec);
//        store.commitChanges();
//    }
//
//}

//function ExcelData(Data) {
//    //debugger;
//    //var ExcelData = Data.data[0].data;
//
//    var ExcelData = Data.data.worksheets[0].data;
//
//    var date = new Date(Date.UTC(1899, 11, 30)).getTime();//-2209161600000
//
//    var store = Ext.getStore("ExcelData");
//
//    store.removeAll();
//
//    PublicObject.ExcelData = [];
//
//    for (var i = 1; i < ExcelData.length; i++) {
//        //debugger;
//        var data = ExcelData[i];
//
//        //debugger;
//        //return;
//
//        //var _policydate = formatDate(new Date(data[4].value.toString().trim()), "yyyy-MM-dd hh:mm:ss");
//        //_policydate = new Date(_policydate).getTime().toString().substr(0, 10);
//
//        var rec = {
//            //id: i,
//            areaid: data[0].value.toString().trim(),
//            username: data[3].value.toString().trim(),
//            usermd5: hex_md5(data[3].value.toString().trim()),
//            realname: data[4].value.toString().trim(),
//            usertel: data[6].value.toString().trim()
//        };
//        //判断是否为undefined
//        for (var j in rec) {
//            if (rec[j] == undefined) {
//                rec[j] = "";
//            }
//        }
//        PublicObject.ExcelData[PublicObject.ExcelData.length] = rec;
//        store.insert(store.getCount(), rec);
//        store.commitChanges();
//    }
//
//}

function createModifyPassWordFormPanel() {
    var records = PublicObject.CurrentUser;
    var nickname = records.nickname,
        username = records.username;
    var formPanel = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        defaults: {width: 300, bodyPadding: 5}, defaultType: 'textfield',
        items: [
            {
                xtype: 'hiddenfield',
                name: 'username', itemId: 'username', value: username
            },
            {
                fieldLabel: '用户名',
                name: 'user', id: 'modifyPwd_user', value: nickname, disabled: true
            },
            {
                fieldLabel: '<span style="color:red">*</span>原始密码',
                id: 'oldpassword',
                name: 'oldpassword',
                allowBlank: false,
                blankText: '必须填写原始密码',
                inputType: 'password'
            },
            {
                fieldLabel: '<span style="color:red">*</span>修改密码',
                id: 'newpassword',
                name: 'newpassword',
                allowBlank: false,
                blankText: '必须填写修改密码',
                inputType: 'password'
            },
            {
                fieldLabel: '<span style="color:red">*</span>确认密码',
                id: 'confirmPwd',
                name: 'confirmPwd',
                allowBlank: false,
                blankText: '必须填写确认密码',
                inputType: 'password'
            }
        ]
    });
    var win = new Ext.Window({
        id: '_modifyPwdWin',
        title: '修改密码', width: 350, height: 180, layout: 'fit', modal: true, plain: true,
        bodyStyle: 'padding:5px;', buttonAlign: 'center', items: [formPanel],
        buttons: [
            {
                text: '修改',
                handler: function () {
                    modifyPassWord(formPanel, win);
                }
            },
            {
                text: '取消',
                handler: function () {
                    win.close();
                }
            }
        ]
    });
    win.show();
}

function modifyPassWord(form, win) {
    var oldPwd = form.down("#oldpassword").getValue(),
        newPwd = form.down("#newpassword").getValue(),
        confirmPwd = form.down('#confirmPwd').getValue(),
        oldPassword = hex_md5(oldPwd),
        newPassword = hex_md5(newPwd);
    if (oldPwd == "") {
        Ext.MessageBox.alert('提示', '原始密码不能为空');
        form.down("#oldpassword").setValue("");
    } else {
        if (newPwd == "" || confirmPwd == "") {
            Ext.MessageBox.alert('提示', '修改密码不能为空');
            form.down("#newpassword").setValue("");
            form.down('#confirmPwd').setValue("");
        } else {
            if (newPwd === confirmPwd) {
                debugger;
                Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/UserCenterSystem/UpdatePassWord', method: 'GET',
                    params: {
                        username: form.down("#username").getValue(),
                        oldpassword: oldPassword,
                        newpassword: newPassword,
                        RandomTag: Math.random()
                    },
                    success: function (response) {
                        debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.err) {
                            Ext.MessageBox.alert("提示", result.err.message);
                        } else {
                            Ext.MessageBox.alert("提示", "修改密码成功，请重新登录");
                            win.close();
                            window.location.href = '/';
                        }
                    },
                    failure: function (response, options) {
                        //debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        window.location.href = "/";
                    }
                });
            }
            else {
                Ext.MessageBox.alert('提示', '修改密码与确认密码不一致')
            }
        }
    }

}

function UserCheckOut() {//用户退出系统
    Ext.getCmp('mainViewPort').getEl().mask("正在退出，请稍候");//遮罩
    Ext.Ajax.request({
        url: '../api/UserCenterSystem/UserCheckOut',
        params: {
            RandomTag: Math.random()
        },
        method: 'Post',
        success: function (response, options) {
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            window.location.href = "/";
        },
        failure: function (response, options) {
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            window.location.href = "/";
        }
    });
}

function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function currentDate() {
    var date = new Date();//当前时间
    var startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());//当天的00:00:00
    var enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);//当天的23:59:59
    return [startdate, enddate];
}
