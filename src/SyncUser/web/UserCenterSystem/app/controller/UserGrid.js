Ext.define('UserCenterSystem.controller.UserGrid', {
    extend: 'Ext.app.Controller',
    views: [
        'UserGrid',
        'UserWindow'
    ],
    stores: [
        'UserStore'
    ],
    init: function () {
        this.control({
            'userGrid': {
                'render': this.GetUser,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('userGridId').getSelectionModel().select(_record);
                    this.EditUser();
                }
            },
            'userGrid #BtnAdd': {
                'click': this.AddUser
            },
            'userGrid #BtnEdit': {
                'click': this.EditUser
            },
            'userGrid #BtnDelete': {
                'click': this.DelUser
            },
            'userGrid #BtnSearch': {
                'click': this.GetUsers
            },
            'userGrid #BtnReset': {
                'click': this.ResetSearchUser
            },
            'userGrid #BtnExport': {
                'click': this.BtnExport
            },
            'userWindow #BtnAdd': {
                'click': this.AddUserWin
            },
            'userWindow #BtnEdit': {
                'click': this.EditUserWin
            },
            'userWindow #BtnCancel': {
                'click': function () {
                    Ext.getCmp("userWindowId").destroy();
                }
            }
        });
    },
    GetUser: function () {
        console.log('调用Getuser');
        //debugger;

        var selecTreeData = PublicObject.selecTreeData;

        //var startdate = "";
        //var enddate = "";
        //
        //if (selecTreeData == 4) {
        //    var DateStart = Ext.getCmp('userGridId').down('#DateStart').rawValue;
        //    var DateEnd = Ext.getCmp('userGridId').down('#DateEnd').rawValue;
        //
        //    if (DateStart != "" && DateStart != undefined && DateStart != null) {
        //        var _startdate = new Date(DateStart);
        //        startdate = new Date(_startdate.getFullYear(), _startdate.getMonth(), _startdate.getDate()).getTime().toString().substr(0, 10);//00:00:00
        //    }
        //    if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
        //        var _enddate = new Date(DateEnd);
        //        enddate = new Date(_enddate.getFullYear(), _enddate.getMonth(), _enddate.getDate(), 23, 59, 59).getTime().toString().substr(0, 10);//23:59:59
        //    }
        //}

        //var keyword = Ext.getCmp('userGridId').down('#keyword').getValue();

        var params = {
            userclass: selecTreeData,
            //startdate: startdate,
            //enddate: enddate,
            //keyword: keyword,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/UserCenterSystem/GetUsers");
        Ext.getStore("UserStore").getProxy().url = queryUrl;
        Ext.getStore("UserStore").getProxy().extraParams = params;
        try {
            Ext.getStore("UserStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("UserStore").load();
    },
    GetUsers: function () {
        console.log('调用Getuser');
        //debugger;

        var selecTreeData = PublicObject.selecTreeData;

        //var startdate = "";
        //var enddate = "";
        //
        //if (selecTreeData == 4) {
        //    var DateStart = Ext.getCmp('userGridId').down('#DateStart').rawValue;
        //    var DateEnd = Ext.getCmp('userGridId').down('#DateEnd').rawValue;
        //
        //    if (DateStart != "" && DateStart != undefined && DateStart != null) {
        //        var _startdate = new Date(DateStart);
        //        startdate = new Date(_startdate.getFullYear(), _startdate.getMonth(), _startdate.getDate()).getTime().toString().substr(0, 10);//00:00:00
        //    }
        //    if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
        //        var _enddate = new Date(DateEnd);
        //        enddate = new Date(_enddate.getFullYear(), _enddate.getMonth(), _enddate.getDate(), 23, 59, 59).getTime().toString().substr(0, 10);//23:59:59
        //    }
        //}

        var keyword = Ext.getCmp('userGridId').down('#keyword').getValue();

        var params = {
            //userclass: selecTreeData,
            //startdate: startdate,
            //enddate: enddate,
            keyword: keyword,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/UserCenterSystem/GetUser");
        Ext.getStore("UserStore").getProxy().url = queryUrl;
        Ext.getStore("UserStore").getProxy().extraParams = params;
        try {
            Ext.getStore("UserStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("UserStore").load();
    },
    ResetSearchUser: function () {

        var selecTreeData = PublicObject.selecTreeData;

        if (selecTreeData == 4) {
            var DateStart = Ext.getCmp('userGridId').down('#DateStart');
            DateStart.setValue(currentDate()[0]);
            var DateEnd = Ext.getCmp('userGridId').down('#DateEnd');
            DateEnd.setValue(currentDate()[1]);
        }

        var keyword = Ext.getCmp('userGridId').down('#keyword');
        keyword.setValue("");

        UserCenterSystem.app.getUserGridController().GetUser();
    },
    AddUser: function () {
        var selecTreeData = PublicObject.selecTreeData;

        var title = "";

        if (selecTreeData == 2) {
            title = "添加商品管理员信息";
        }
        var win = Ext.create('UserCenterSystem.view.UserWindow', {
            title: title,
            listeners: {
                render: function () {

                },
                show: function () {

                    Ext.getCmp('userWindowId').down('#BtnEdit').setVisible(false);

                    if (selecTreeData == 2) {
                        Ext.getCmp('userWindowId').height = 170;
                        //Ext.getCmp('userWindowId').down('#duetime').setVisible(false);
                        //Ext.getCmp('userWindowId').down('#appid').setVisible(false);
                        //Ext.getCmp('userWindowId').down('#appname').setVisible(false);
                    }

                    //Ext.getCmp('userWindowId').down('#userclass').setValue(selecTreeData);
                    //Ext.getCmp('userWindowId').down('#userclass').setReadOnly(true);
                    //Ext.getCmp('userWindowId').down('#userclass').setFieldStyle('background:#ffffff;border:0px;');

                }
            }
        });
        win.show();
    },
    EditUser: function () {
        //debugger;

        var selecTreeData = PublicObject.selecTreeData;

        var title = "";

        if (selecTreeData == 2) {
            title = "修改商品管理员信息";
        }

        var selectUser = Ext.getCmp('userGridId').getSelectionModel().getSelection();

        if (selectUser.length == 1) {
            var win = Ext.create('UserCenterSystem.view.UserWindow', {
                title: title,
                listeners: {
                    render: function () {

                    },
                    show: function () {

                        debugger;

                        PublicObject.selectUser = selectUser[0];

                        Ext.getCmp('userWindowId').down('#BtnAdd').setVisible(false);

                        Ext.getCmp('userWindowId').down('#username').setReadOnly(true);
                        Ext.getCmp('userWindowId').down('#username').setFieldStyle('background:#ffffff;border:0px;');
                        Ext.getCmp('userWindowId').down('#username').setValue(selectUser[0].raw.username);

                        Ext.getCmp('userWindowId').down('#password').setFieldLabel('密码(不改请留空)');

                        Ext.getCmp('userWindowId').down('#realname').setValue(selectUser[0].raw.realname);

                        Ext.getCmp('userWindowId').down('#mobile').setValue(selectUser[0].raw.mobile);
                        console.log(selectUser[0].raw.mobile);
                        if (selecTreeData == 2) {
                            Ext.getCmp('userWindowId').height = 170;
                        }

                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请选择一条内容');
        }
    },
    DelUser: function () {
        var selectUser = Ext.getCmp('userGridId').getSelectionModel().getSelection();

        console.log(selectUser);
        if (selectUser.length > 0) {

            var usernames = "";
            for (var i = 0; i < selectUser.length; i++) {
                var username = selectUser[i].raw.username;
                if (i == selectUser.length - 1) {
                    usernames += username;
                } else {
                    usernames += username + ",";
                }
            }

            //debugger;

            Ext.MessageBox.confirm("提示", "是否要删除用户名[<font color='red'>" + username + "</font>]？", function (btnId) {
                if (btnId == "yes") {
                    Ext.getCmp('mainViewPort').getEl().mask("正在进行操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/UserCenterSystem/DelUser',
                        params: {
                            username: username,
                            RandomTag: Math.random()
                        },
                        method: 'Post',
                        success: function (response, options) {
                            //debugger;
                            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('UserStore').reload();
                                Ext.MessageBox.alert('提示', '删除成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '请至少选择一条内容');
        }
    },
    AddUserWin: function () {

        var selecTreeData = PublicObject.selecTreeData;

        var username = Ext.getCmp('userWindowId').down('#username').getValue();
        var password = Ext.getCmp('userWindowId').down('#password').getValue();
        var realname = Ext.getCmp('userWindowId').down('#realname').getValue();
        var mobile = Ext.getCmp('userWindowId').down('#mobile').getValue();
        //var nickname = Ext.getCmp('userWindowId').down('#nickname').getValue();
        //var userclass = Ext.getCmp('userWindowId').down('#userclass').getValue();

        //var duetime = "";
        //var appid = "";
        //var appname = "";

        //if (selecTreeData == 4) {
        //    duetime = Ext.getCmp('userWindowId').down('#duetime').rawValue;
        //    appid = Ext.getCmp('userWindowId').down('#appid').getValue();
        //    appname = Ext.getCmp('userWindowId').down('#appname').getValue();
        //}

        if (username == "") {
            Ext.MessageBox.alert("提示", "用户名不能为空");
            return;
        }

        if (password == "") {
            Ext.MessageBox.alert("提示", "密码不能为空");
            return;
        }

        if (realname == "") {
            Ext.MessageBox.alert("提示", "姓名不能为空");
            return;
        }

        if (mobile == "") {
            Ext.MessageBox.alert("提示", "电话号码不能为空");
            return;
        }


        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/UserCenterSystem/AddUser',
            params: {
                username: username,
                password: hex_md5(password),
                realname: realname,
                mobile: mobile,
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    Ext.getStore('UserStore').reload();
                    //Ext.getCmp('userWindowId').destroy();
                    Ext.MessageBox.alert('提示', '添加成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    EditUserWin: function () {

        var selecTreeData = PublicObject.selecTreeData;

        var username = Ext.getCmp('userWindowId').down('#username').getValue();
        var password = Ext.getCmp('userWindowId').down('#password').getValue();
        var realname = Ext.getCmp('userWindowId').down('#realname').getValue();
        var mobile = Ext.getCmp('userWindowId').down('#mobile').getValue();



        if (username == "") {
            Ext.MessageBox.alert("提示", "用户名不能为空");
            return;
        }

        if (realname == "") {
            Ext.MessageBox.alert("提示", "真实姓名不能为空");
            return;
        }
        if (mobile == "") {
            Ext.MessageBox.alert("提示", "电话号码不能为空");
            return;
        }

        if (password != "") {
            password = hex_md5(password);
        }

        debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/UserCenterSystem/EditUser',
            params: {
                username: username,
                password: password,
                realname: realname,
                mobile: mobile,
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    Ext.getStore('UserStore').reload();
                    Ext.getCmp('userWindowId').destroy();
                    Ext.MessageBox.alert('提示', '修改成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    BtnExport: function () {
        //debugger;

        //var keyword = Ext.getCmp('userGridId').down('#keyword').getValue();

        //var DateStart = Ext.getCmp('userGridId').down('#DateStart').rawValue;
        //var DateEnd = Ext.getCmp('userGridId').down('#DateEnd').rawValue;
        //
        //var startdate = "";
        //if (DateStart != "" && DateStart != undefined && DateStart != null) {
        //    var _startdate = new Date(DateStart);
        //    startdate = new Date(_startdate.getFullYear(), _startdate.getMonth(), _startdate.getDate()).getTime().toString().substr(0, 10);//00:00:00
        //}
        //var enddate = "";
        //if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
        //    var _enddate = new Date(DateEnd);
        //    enddate = new Date(_enddate.getFullYear(), _enddate.getMonth(), _enddate.getDate(), 23, 59, 59).getTime().toString().substr(0, 10);//00:00:00
        //}

        //var CurrentUser = PublicObject.CurrentUser;
        //var realname = CurrentUser.realname;
        //var date = new Date();
        //var filename = realname + "_" + formatDate(date, "yyyyMMddhhmmss");
        var params = {
            //keyword: keyword,
            //startdate: startdate,
            //enddate: enddate,
            //filename: filename,
            RandomTag: Math.random()
        };
        Ext.getCmp('mainViewPort').getEl().mask("正在获取Excel下载链接，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/UserCenterSystem/GetUsersExcelUrl',
            params: params,
            method: 'Post',
            success: function (response) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                var rspText = Ext.JSON.decode(response.responseText);
                //console.log(rspText);
                if (rspText.success == true) {
                    var data = rspText.data;
                    //Ext.MessageBox.alert("提示", "下载地址有效时间为30分钟<br/><a href='" + '../' + data + "'>点击下载</a>");
                    Ext.MessageBox.confirm('确认', '是否确定导出excel文件', function (btn) {
                        if (btn == 'yes') {
                            window.open('../' + data);
                        }
                    });
                } else {
                    Ext.MessageBox.alert("抱歉", "下载链接获取错误，请刷新页面后重试");
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    }
});