Ext.define('UserCenterSystem.store.UserStore', {
    extend: 'Ext.data.Store',
    fields: [
        'username', 'password', 'realname','mobile'

    ],
    pageSize: PublicObject.pageSize,
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            //type: 'json', root: 'data', successProperty: 'success'
            type: 'json',
            root: 'data',
            totalProperty: 'data.totalCount',
            successProperty: 'success'
        }
    }
});