Ext.define('UserCenterSystem.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'UserCenterSystem.view.CenterPanel',
        'UserCenterSystem.view.NorthPanel',
        'UserCenterSystem.view.WestPanel'
    ],
    id: 'mainViewPort',
    layout: 'border',
    //style:'background-color:#498fd7',
    items: [
        {
            xtype: 'northPanel',
            region: 'north'
        },
        {
            xtype: 'panel',
            layout: 'border',
            region: 'west',
            border: false,
            width: 200,
            bodyStyle: 'background:#ffeed9;',
            items: [
//                {
//                    xtype: 'panel',
//                    region: 'north',
//                    border: false,
//                    height: 35,
////                    bodyStyle: 'background:#ffeed9;',
//                    html: '<img width="200px" height="35px;" src="../images/title-banner-management.png">',
//                    bodyStyle: 'background:#e98136'
//                },
                {
                    xtype: 'westPanel',
                    border: false,
                    bodyStyle: 'background:#ffeed9;',
                    region: 'center'
                }
            ]
        },
        {
            xtype: 'centerPanel',
            bodyStyle: 'background-color: #ffeed9;background-image: url();',
            region: 'center'
        }
    ]
});