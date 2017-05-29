(function () {
    Ext.define('UserCenterSystem.view.UserGrid', {
        extend: 'Ext.grid.Panel',
        xtype: 'userGrid',
        id: 'userGridId',
        enableColumnMove: false,
        store: 'UserStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '用户名', flex: 1, dataIndex: 'username'
            },
            {
                text: '真实姓名', flex: 1, dataIndex: 'realname'
            },
            {
                text: '电话', flex: 1, dataIndex: 'mobile'
            }


        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                //defaults: {style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #ffeed9;background-image: url();',
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeDataName"></div>'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    {
                        text: '<span style="color: #000000;font-weight: bold">新增</span>',
                        itemId: 'BtnAdd',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  ',
                    {
                        text: '<span style="color: #000000;font-weight: bold">修改</span>',
                        itemId: 'BtnEdit',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  ',
                    {
                        text: '<span style="color: #000000;font-weight: bold">删除</span>',
                        itemId: 'BtnDelete',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  '
                ]
            },
            {
                itemId: 'DateToolBar',
                xtype: 'toolbar',
                dock: 'top',
                hidden: true,
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background:#ffeed9;',
                        html: '<span style="color: #000000;">时间范围  </span>'
                    },
                    {
                        xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                        width: 150,
                        labelWidth: 15,
                        anchor: '100%',
                        format: 'Y-m-d',
                        fieldLabel: '从',
                        value: currentDate()[0],
                        editable: false, blankText: '必须选择起始时间',
                        listeners: {
                            select: function () {
                                if (this.getValue() > this.up('toolbar').down('#DateEnd').getValue()) {
                                    Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                                    this.setValue(this.up('toolbar').down('#DateEnd').getValue());
                                }
                            }
                        }
                    },
                    {
                        xtype: 'datefield', name: 'endCreateTime', itemId: 'DateEnd',
                        width: 150,
                        labelWidth: 15,
                        anchor: '100%',
                        format: 'Y-m-d',
                        fieldLabel: '至',
                        value: currentDate()[1],
                        editable: false, blankText: '必须选择结束时间',
                        listeners: {
                            select: function () {
                                if (this.getValue() < this.up('toolbar').down('#DateStart').getValue()) {
                                    Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                                    this.setValue(this.up('toolbar').down('#DateStart').getValue());
                                }
                            }
                        }
                    },
                    '  '
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background:#ffeed9;',
                        html: '<span style="color: #000000;">关键词：</span>'
                    },
                    {
                        xtype: 'textfield', width: 120, itemId: 'keyword'
                    },
                    '  ',
                    {
                        text: '<span style="color: #000000;font-weight: bold">查询</span>',
                        itemId: 'BtnSearch',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  ',
                    {
                        text: '<span style="color: #000000;font-weight: bold">重置</span>',
                        itemId: 'BtnReset',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  ',
                    '->',
                    {
                        text: '<span style="color: #000000;font-weight: bold;">导出Excel</span>',
                        itemId: 'BtnExport',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 70
                    }
                    ,
                    '  ',
                    {
                        text: '<span style="color: #000000;font-weight: bold;">导入Excel</span>',
                        itemId: 'BtnImport',
                        style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                        width: 70
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: 'UserStore',
                dock: 'bottom',
                displayInfo: true
            }
        ]
    });
}).call(this);