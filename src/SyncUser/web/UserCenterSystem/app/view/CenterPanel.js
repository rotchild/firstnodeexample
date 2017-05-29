Ext.define('UserCenterSystem.view.CenterPanel', {
    extend: 'Ext.Panel',
    xtype: 'centerPanel',//alias : 'widget.northPanel',等价
    id: 'centerPanel',
    border: false,
    layout: 'border',
    requires: [
        'UserCenterSystem.view.UserGrid'
    ],
    items: []
});