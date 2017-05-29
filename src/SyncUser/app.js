(function() {
    var MySQLStore, app, cluster, express, http, i, numCPUs, path, pool, routes, settings,os,_i,ipaddress;

    express = require('express');
    routes = require('./routes/routes');
    http = require('http');
    path = require('path');
    cluster = require('cluster');
    numCPUs = 1;
    settings = require('./settings');
    pool = require('mysql').createPool(settings.mysql);
    MySQLStore = require('connect-mysql')(express);
//    settings.excelDir = path.join(__dirname, 'web/excel'); //确定excel文件保存路径配置在settings.js文件
    if (cluster.isMaster) {
        console.log('master');
        for (i = _i = 0; 0 <= numCPUs ? _i < numCPUs : _i > numCPUs; i = 0 <= numCPUs ? ++_i : --_i) {
            cluster.fork();
        }
        cluster.on('exit', function(worker) {
            console.log('Worker ' + worker.id + ' died :(');
            return cluster.fork();
        });
    } else {
        app = express();
        app.set('port',settings.serverPort);
//        app.set('views', __dirname + '/views');
//        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({
            secret: settings.cookie_secret,
            store: new MySQLStore({
                pool: pool
            }),
            cookie: {
                maxAge: 60000 * 60 * 24 * 30 * 3
            }
        }));
        app.use(app.router);
        app.use(express["static"](path.join(__dirname, 'web')));
        app.configure('development', function() {
            return app.use(express.errorHandler());
        });
        app.configure('production', function() {
            return app.use(express.errorHandler());
        });
        routes(app);
        http.createServer(app).listen(app.get('port'), function() {

            var consoleDay = new Date();
            var consoleDayStr = consoleDay.getFullYear()+'-'+checkTime(consoleDay.getMonth()+1) + '-' +
                checkTime(consoleDay.getDate()) + ' ' + checkTime(consoleDay.getHours()) + ":" +
                checkTime(consoleDay.getMinutes()) + ":" + checkTime(consoleDay.getSeconds());
            return console.log('服务器启动 - 端口:[' + app.get('port') + '] 时间:[' + consoleDayStr +']');
        });

        //全局服务组
        //var serviceGroup = require('./api/CaseRecordSystem/Api_CaseRecordSystem.js').ServiceGroup();
        //setInterval(serviceGroup.UpdateNasState,settings.ServiceGroupTimeSet);
        //setInterval(serviceGroup.DeleteNasFile,settings.DeleteNasFileTimeInterval);
    }
    function checkTime(i){
        return i>=10?i:"0"+i;
    }
}).call(this);

