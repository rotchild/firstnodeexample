Ext.define('UserCenterSystem.view.UserWindow', {
    extend: 'Ext.Window',
    xtype: 'userWindow',
    id: 'userWindowId',
    modal: true,
    width: 400,
    height: 245,
    plain: true,
    //初始化表单面板
    items: [
        {
            xtype: 'form',
            layout: 'form',
            bodyStyle: 'background:#ffffff',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'userForm',
            items: [
                {xtype: 'textfield', fieldLabel: '用户名', itemId: 'username'},
                {
                    xtype: 'textfield',
                    fieldLabel: '密码',
                    inputType: 'password',
                    itemId: 'password'
                },
                {xtype: 'textfield', fieldLabel: '真实姓名', itemId: 'realname'},
                {xtype: 'textfield', fieldLabel: '电话号码', itemId: 'mobile'},
                //{
                //    xtype: 'combo',
                //    fieldLabel: '用户级别',
                //    itemId: 'userclass',
                //    store: new Ext.data.SimpleStore({
                //        data: [
                //            //[1, '超级管理员'],
                //            [2, '商品管理员'],
                //            [3, '商城系统账号'],
                //            [4, '客户系统账号']
                //        ],
                //        fields: ['value', 'text']
                //    }),
                //    mode: 'local',
                //    triggerAction: 'all',
                //    editable: false,
                //    value: '',
                //    displayField: 'text',
                //    valueField: 'value'
                //},
                //{
                //    xtype: 'datefield',
                //    itemId: 'duetime',
                //    anchor: '100%',
                //    format: 'Y-m-d',
                //    fieldLabel: '有效时间',
                //    editable: false
                //},
                //{xtype: 'textfield', fieldLabel: 'AppId', itemId: 'appid'},
                //{xtype: 'textfield', fieldLabel: 'AppName', itemId: 'appname'}
                //{
                //    xtype: "checkboxgroup",
                //    itemId: 'userclass',
                //    fieldLabel: "用户级别",
                //    columns: 3,
                //    items: [
                //        {boxLabel: "系统管理", name: "1", id: 'UserClass01'},
                //        {boxLabel: "任务系统", name: "2", id: 'UserClass02'},
                //        {boxLabel: "积分管理", name: "3", id: 'UserClass03'},
                //        {boxLabel: "信息发布", name: "4", id: 'UserClass04'},
                //        {boxLabel: "网点管理", name: "5", id: 'UserClass05'},
                //        //{boxLabel: "商家", name: "6", id: 'UserClass06'},
                //        {boxLabel: "保单任务", name: "8", id: 'UserClass08'},
                //        {boxLabel: "综合管理", name: "9", id: 'UserClass09'}
                //    ]
                //},
                //{
                //    xtype: 'combo',
                //    fieldLabel: '所属机构',
                //    itemId: 'AreaItemId',
                //    store: "Area",
                //    mode: 'local',
                //    triggerAction: 'all',
                //    editable: false,
                //    value: '',
                //    displayField: 'areaname',
                //    valueField: 'id'
                //}
            ],
            buttons: [
                '->',
                {text: '添加', itemId: 'BtnAdd'},
                {text: '修改', itemId: 'BtnEdit'},
                {text: '取消', itemId: 'BtnCancel'},
                '->'
            ]
        }
    ]
})
;
