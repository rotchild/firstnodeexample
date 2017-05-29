/**
 * Created by Administrator on 15-1-2.
 */

var mysql = require('mysql');
var config = require('../../settings');
var File = require('../libs/File');
var pool = mysql.createPool(config.mysql);
var hcUti=require("../libs/hcUti.js");
var request = require('request');
var eventproxy=require('eventproxy');
var path = require('path');
var Buffer = require("buffer").Buffer;
exports.GetApi = function (_req, _res, _callbackFunction, _errMark) {
    return {
        sqlConn: require('../libs/db.js'),//数据库连接属性
        req: _req,
        res: _res,
        errors: _errMark,
        callbackFunction: _callbackFunction,
        errObj: {code: '-1', cause: ''},
        GetParams: function (paramName) {
            if (typeof(_req.query[paramName]) == "undefined" && typeof(_req.body[paramName]) == "undefined")
                throw {message: '缺乏参数：' + paramName};
            else if (!_req.query[paramName])
                return _req.body[paramName];
            else
                return _req.query[paramName];
        },


        LoginCheck: function () {
            console.log("111");
            var Me, username, password;
            Me = this;
            username = this.GetParams("username");
            password = this.GetParams("password");
            var sqlCmd = "select * " +
                " from `user` " +
                " where username = ? and password = ?;";
            Me.sqlConn.query(sqlCmd, [username, password], function (_err, _results) {
                if (!_err) {
                    if (_results.length > 0) {
                        //console.log("进入接口LoginCheck：",_results[0]);
                        Me.req.session.MSuser = _results[0];
                        Me.callbackFunction(null, _results[0]);
                    } else {
                        _err = Me.errors.WrongLogin;
                        Me.callbackFunction(_err, false);
                    }
                } else {
                    Me.callbackFunction(_err, _results);
                }
            });
        },

        UserCheck: function () {
            var Me = this;
            Me.callbackFunction(null, Me.req.session.MSuser);
        },

        UserCheckOut: function () {
            var Me = this;
            try {
                delete Me.req.session.MSuser;
            } catch (err) {
            }///单纯屏蔽错误，不作处理。
            Me.callbackFunction(null, 'UserCheckOut');
        },

        GetUsers: function () {
            console.log("进入接口GetUsers");
            var Me;
            Me = this;
            //keyword = this.GetParams('keyword');
            //userclass = this.GetParams('userclass');

            //start = this.GetParams("start");
            //limit = this.GetParams("limit");

            //startdate = startdate + " 00:00:00";
            //enddate = enddate + " 23:59:59";

            //var sqlCmd = "select * from `user` ";
            //var sqlParams = [];
            var sqlCmd = "select * from `user`;";
            Me.sqlConn.query(sqlCmd, [], Me.callbackFunction);


            //if (startdate) {
            //    sqlWhere += "and ordertime >= '" + startdate + "' ";
            //}
            //
            //if (enddate) {
            //    sqlWhere += "and ordertime <= '" + enddate + "' ";
            //}

            // 关键字查询
            //if (keyword != "" && keyword != undefined) {
            //    sqlWhere += "and ( username like ? " +
            //    " or realname like ? " +
            //    " or mobile like ? ) ";
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //}
            //
            //sqlCmd = sqlCmd + sqlWhere + " order by id desc limit " + start + "," + limit + ";";
            //
            //sqlCmd += "select count(id) as totalCount from `user` ";
            //
            //sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            //if (keyword != "" && keyword != undefined) {
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //    sqlParams[sqlParams.length] = '%' + keyword + '%';
            //}

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            //this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
            //    if (err) {
            //        console.log(err);
            //        Me.callbackFunction(err, results);
            //    } else {
            //        Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
            //    }
            //});
        },
        GetUser: function () {
            console.log("进入接口GetUser");
            var Me;
            Me = this;
            keyword = this.GetParams('keyword');
            console.log(keyword);

            //var sqlCmd = "select * from `user` ";
            //var sqlParams = [];



             //关键字查询
            var sqlWhere='';
            var sqlParams = [];
            var sqlCmd = '';
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and (username like ? " +
                " or realname like ? " +
                " or mobile like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            };

            //sqlCmd = sqlCmd + sqlWhere + " order by id desc limit " + start + "," + limit + ";";

            sqlCmd += "select * from `user` ";

            sqlCmd = sqlCmd + sqlWhere + ";";

             //关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                //sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            console.log("sqlCmd语句：", sqlCmd);
            console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        AddUser: function () {
            console.log("进入接口：AddUser");
            var Me = this;
            username = Me.GetParams("username");
            password = Me.GetParams("password");
            realname = Me.GetParams("realname");
            mobile = Me.GetParams("mobile");

            console.log("获取的数据：",username);
            console.log("获取的数据：",password);

            var sqlCmd = "insert into `user` (username,password,realname,mobile) values (?,?,?,?)";
            //console.log(sqlCmd);
            this.sqlConn.query(sqlCmd, [username, password, realname, mobile], Me.callbackFunction);

            //console.log("进入接口AddUser");
            //var Me, username, password, realname, mobile;
            //Me = this;
            //username = Me.GetParams("username");
            //password = Me.GetParams("password");
            //realname = Me.GetParams("realname");
            //mobile = Me.GetParams("mobile");
            //
            //
            ////var sqlParams = [];
            ////var sqlCmd = "select * from `user` where username = ?;";
            ////sqlParams[sqlParams.length] = username;
            //
            ////console.log("sqlCmd语句：", sqlCmd);
            ////console.log("sqlParams语句：", sqlParams);
            //
            //this.sqlConn.query(sqlCmd, sqlParams, function (_err, _results) {
            //    if (_err) {
            //        Me.callbackFunction(_err, _results);
            //    } else {
            //        if (_results.length > 0) {
            //            Me.callbackFunction(Me.errors.DuplicateUser, null);
            //        } else {
            //            var sqlParams2 = [];
            //            var sqlCmd2 = "insert into `user` (username,password,realname,mobile) values (?,?,?,?);";
            //            sqlParams2[sqlParams2.length] = username;
            //            sqlParams2[sqlParams2.length] = password;
            //            sqlParams2[sqlParams2.length] = realname;
            //            sqlParams2[sqlParams2.length] = mobile;
            //
            //            //console.log("查询语句1：", sqlCmd2);
            //            //console.log("查询语句2：", sqlParams2);
            //            Me.sqlConn.query(sqlCmd2, sqlParams2, Me.callbackFunction);
            //        }
            //    }
            //});
        },
        EditUser: function () {
            //console.log("进入接口EditUser");
            var Me, username, password, realname,
                 mobile;
            Me = this;
            username = Me.GetParams("username");
            password = Me.GetParams("password");
            realname = Me.GetParams("realname");
            mobile = Me.GetParams("mobile");
            var sqlParams = [];
            var sqlCmd = "";
            if (password != "") {
                sqlCmd = "update `user` set realname = ?  ,mobile = ?  ,password = ? where username = ? ;";
                sqlParams[sqlParams.length] = realname;
                sqlParams[sqlParams.length] = mobile;
                sqlParams[sqlParams.length] = password;
                sqlParams[sqlParams.length] = username;
            } else {
                sqlCmd = "update `user` set realname = ? ,mobile = ?  ? where username = ? ;";
                sqlParams[sqlParams.length] = realname;
                sqlParams[sqlParams.length] = mobile;
                sqlParams[sqlParams.length] = username;
            }

            //console.log("查询语句1：", sqlCmd);
            //console.log("查询语句2：", sqlParams);
            Me.sqlConn.query(sqlCmd, sqlParams, Me.callbackFunction);
        },
        DelUser: function () {
            //console.log("进入接口DelUser");
            var Me, username;
            Me = this;
            id = Me.GetParams("username");
            var sqlCmd = "delete from `user` where username = ? ;";
            Me.sqlConn.query(sqlCmd, [id], Me.callbackFunction);
        },
//        GetDishStatisticsExcelUrl: function () {
//            //console.log("进入接口GetDishStatisticsExcelUrl");
//            var Me, startdate, enddate, keyword, dishtype, filename;
//            Me = this;
//            startdate = this.GetParams('startdate');
//            enddate = this.GetParams('enddate');
//            keyword = this.GetParams('keyword');
//            dishtype = this.GetParams('dishtype');
//            filename = this.GetParams('filename');
//            startdate = startdate + " 00:00:00";
//            enddate = enddate + " 23:59:59";
//
//            var sqlCmd = "select * from view_evaluation_menu_menuclass ";
//            var sqlWhere = "where menu_dishtype in ("+dishtype+") ";
//            var sqlParams = [];
//
//            if (startdate) {
//                sqlWhere += "and createtime >= '" + startdate + "' ";
//            }
//
//            if (enddate) {
//                sqlWhere += "and createtime <= '" + enddate + "' ";
//            }
//
//            // 关键字查询
//            if (keyword != "" && keyword != undefined) {
//                sqlWhere += "and ( menu_dishname like ? ) ";
//                sqlParams[sqlParams.length] = '%' + keyword + '%';
//            }
//
//            sqlCmd = sqlCmd + sqlWhere + ";";
//
////            var sqlCmd2 = "select * from menu ";
////            var sqlWhere2 = "where dishtype in ( " + dishtype + " ) ";
////
////            // 关键字查询
////            if (keyword != "" && keyword != undefined) {
////                sqlWhere2 += "and ( dishname like ? ) ";
////                sqlParams[sqlParams.length] = '%' + keyword + '%';
////            }
////
////            sqlCmd2 = sqlCmd2 + sqlWhere2 + ";";
//
//            //console.log("sqlCmd+sqlCmd2语句：", sqlCmd);
//            //console.log("sqlParams语句：", sqlParams);
//
//            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
//                if (err) {
//                    console.log("excel:",err);
//                    Me.callbackFunction(err, results);
//                } else {
//
//                    //console.log("获取的数据为：", results);
//                    var recordData=results;
//                    var excel = "";
//                    excel=[['菜品名称','分类名称','菜品类型','数量']];
//                    for(var i=0;i<recordData.length;i++){
//                        var rec=[];
//                        var dishtype=recordData[i].menu_dishtype;
//                        var dishtypeName="";
//                        if(dishtype==1){
//                            dishtypeName="堂食";
//                        }else if(dishtype==2){
//                            dishtypeName="外卖";
//                        }else if(dishtype==3){
//                            dishtypeName="食杂铺"
//                        }
//                        rec[rec.length]=recordData[i].dishname;
//                        rec[rec.length]=recordData[i].menuclassname;
//                        rec[rec.length]=dishtypeName;
//                        rec[rec.length]=recordData[i].menu_sellcount || 0;
//                        excel[excel.length]=rec;
//                    }
////                    excel = [["菜品ID", "菜品名称", "菜品类型", "数量", "现价", "销售金额", "菜单总销售金额", "占菜单总销售额度比", "总营收额", "占总营收额比"]];
//
////                    var EvaluationData = results[0];//菜品销售数据
////
////                    var MenuData = results[1];//菜品数据
////
////                    var TotalAmount = 0;//总营收金额
////                    var TotalAmountRate = 0;//总营收金额比
////
////                    var MenuSalesAmount = 0;//菜品销售金额
////                    var MenuSalesAmountRate = 0;//菜品销售金额比
////                    for (var k = 0; k < EvaluationData.length; k++) {
////
////                        var kData = EvaluationData[k];
////
////                        TotalAmount += kData.menucount * kData.presentprice;
////
////                        if (kData.menu_dishtype == dishtype) {
////
////                            MenuSalesAmount += kData.menucount * kData.presentprice;
////
////                        }
////
////                    }
////
////                    for (var j = 0; j < MenuData.length; j++) {
////
////                        var jData = MenuData[j];
////
////                        var SalesCount = 0;//销售数量
////                        var SalesAmount = 0;//销售金额
////                        //var MenuSalesAmount = 0;//菜品销售金额
////                        //var MenuSalesAmountRate = 0;//菜品销售金额比
////
////                        for (var i = 0; i < EvaluationData.length; i++) {
////
////                            var iData = EvaluationData[i];
////
////                            if (jData.id == iData.menuid && iData.menu_dishtype == dishtype) {
////
////                                SalesCount += iData.menucount;
////
////                                SalesAmount += iData.menucount * iData.presentprice;
////
////                            }
////
////                        }
////
////                        if (MenuSalesAmount != 0) {
////
////                            MenuSalesAmountRate = (SalesAmount / MenuSalesAmount).toFixed(2);
////
////                        }
////
////                        if (TotalAmount != 0) {
////
////                            TotalAmountRate = (SalesAmount / TotalAmount).toFixed(2);
////
////                        }
////
////                        var arr = [];
////
////                        arr[arr.length] = jData.id;
////                        arr[arr.length] = jData.dishname;
////
////                        var DishType = jData.dishtype;
////                        var _DishType = "";
////                        if (DishType == 1) {
////                            _DishType = "堂食";
////                        } else if (DishType == 2) {
////                            _DishType = "外卖";
////                        } else if (DishType == 3) {
////                            _DishType = "杂食";
////                        }
////                        arr[arr.length] = _DishType;
////
////                        arr[arr.length] = SalesCount;
////                        arr[arr.length] = jData.presentprice;
////                        arr[arr.length] = SalesAmount;
////                        arr[arr.length] = MenuSalesAmount;
////                        arr[arr.length] = MenuSalesAmountRate;
////                        arr[arr.length] = TotalAmount;
////                        arr[arr.length] = TotalAmountRate;
////
////                        excel[excel.length] = arr;
////
////                    }
//
//                    //console.log("excel数据：", excel);
//
//                    var xlsx2 = require("../libs/xlsx2");
//                    var excelDir = "excel";
//                    var path = require('path');
//                    var File = require('../libs/File');
//                    xlsx2.createExcelUrl(filename, excel, excelDir, function (err, result) {
//                        if (err) {
//                            console.log("excel:",err);
//                            Me.callbackFunction(err, result);
//                        } else {
//                            var employeePath = path.join(__dirname, '../../web/excel');
//                            var fullPath = File.joinfilePath([employeePath, filename + ".xlsx"]);
//                            //console.log("全局路径",fullPath);
//                            xlsx2.deleteFile(fullPath, function (_err, _result) {
//                                if (_result) {
//                                    //Me.callbackFunction(err,result);
//                                } else {
//                                    Me.callbackFunction(null, false);
//                                }
//                            });
//                            Me.callbackFunction(err, result);
//                        }
//                    });
//
//                }
//            });
//        },
        GetUsersExcelUrl: function(){
            //console.log(this);
            console.log('进入接口：GetUsersExcelUrl');
            var Me=this;
            var filename ='管理员列表';

            var sqlparams = [];
            //var sqlwhere = "";

            var sqlcmd = "select * from `user`'";
            Me.sqlConn.query(sqlcmd,sqlparams, function(err,results){
                if (err) {
                    //console.log("excel:",err);
                    callback(err, results);
                } else {
                    var recordData=results;
                    //console.log(recordData);
                    //console.log('1222'+eval(recordData).length);
                    var excel = "";
                    excel=[['用户名','真实姓名','电话']];
                    for(var i=0;i<recordData.length;i++){
                        var rec=[];
                        //console.log('zhouleu'+time);
                        rec[rec.length]=recordData[i].username;
                        rec[rec.length]=recordData[i].realname;
                        rec[rec.length]=recordData[i].mobile;
                        excel[excel.length]=rec;
                    }
//
                    var xlsx2 = require("../libs/xlsx2");
                    var excelDir = settings.excelDir;
                    var path = require('path');
                    var File = require('../libs/File');
                    xlsx2.createExcelUrl(filename, excel, excelDir, function (err, result) {
                        if (err) {
                            console.log("excel:",err);
                            callback(err, result);
                        } else {
                            //var employeePath = path.join(__dirname, '../../web/excel');
                            var employeePath = path.join(__dirname, '../../web/excel');
                            console.log("全局路径111",employeePath);
                            var fullPath = File.joinfilePath([employeePath, filename + ".xlsx"]);
                            console.log("全局路径",fullPath);
                            xlsx2.deleteFile(fullPath, function (_err, _result) {
                                if (_result) {
                                    //Me.callbackFunction(err,result);
                                } else {
                                    callback(null, false);
                                }
                            });
                            callback(err, result);
                        }
                    });

                }
            });
        },
    }

};


