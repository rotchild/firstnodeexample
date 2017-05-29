Ext.define('UserCenterSystem.view.WestPanel', {
    extend: 'Ext.Panel',
    xtype: 'westPanel',//alias : 'widget.northPanel',等价
    border: false,
    width: 201,
    layout: 'fit',
    id: 'westPanel',
    items: [
        {
            xtype: 'tree',
            id: 'wpTreePanel',
            border: false,
            bodyStyle: 'background-color:#ffeed9;',
            rootVisible: false,
            lines: false,
//            useArrows:false,
            root: {
                expanded: true,
                children: [
                    //{
                    //    text: "超级管理员", name: 1
                    //},
                    {
                        text: "商品管理员", name: 2
                    },
                    //{
                    //    text: "商城系统账号", name: 3
                    //},
                    //{
                    //    text: "客户系统账号", name: 4
                    //}
                ]
            }
        }
    ]
});