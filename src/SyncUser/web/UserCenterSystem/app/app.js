Ext.application({
    name: 'UserCenterSystem',
    extend: 'Ext.app.Application',
    controllers: [
        'Viewport',
        'WestPanel',
        'UserGrid'
    ],
    autoCreateViewport: true
});