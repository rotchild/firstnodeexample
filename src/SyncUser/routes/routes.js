(function () {
    var suRoute;
    //suRoute = require('../api/Public/route');
    suRoute =require('../api/UserCenterSystem/route');
    //console.log("进入路由")
    module.exports = function (app) {
         //suRoute(app);
        return suRoute(app);
    };
}).call(this);