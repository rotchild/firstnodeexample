Ext.define('UserCenterSystem.controller.WestPanel', {
    extend: 'Ext.app.Controller',
    stores: [
        'UserStore'
    ],
    init: function () {
        this.control({
            '#westPanel': {
                'render': function () {
                }
            },
            '#westPanel #wpTreePanel': {
                'itemclick': function (tree, record, item, index, e, eOpts) {
                    if (record.raw.name == 1) {//超级管理员

                        PublicObject.selecTreeData = record.raw.name;

                    } else if (record.raw.name == 2) {//商品管理员

                        PublicObject.selecTreeData = record.raw.name;

                        this.ShowUserGrid();

                    } else if (record.raw.name == 3) {//商城系统账号

                        PublicObject.selecTreeData = record.raw.name;

                        this.ShowUserGrid();

                    } else if (record.raw.name == 4) {//客户系统账号

                        PublicObject.selecTreeData = record.raw.name;

                        this.ShowUserGrid();

                    }
                }
            }
        });
    },
    ShowUserGrid: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('userGrid', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));

        //debugger;

        if (PublicObject.selecTreeData == 2) {//商品管理员
            document.getElementById("TreeDataName").innerHTML = "商品管理员";
            //Ext.getCmp("userGridId").columns[4].hide();
            //Ext.getCmp("userGridId").columns[5].hide();
            //Ext.getCmp("userGridId").columns[6].hide();

            //Ext.getCmp("userGridId").down("#DateToolBar").hide();
        }
        //if (PublicObject.selecTreeData == 3) {//商城系统账号
        //    document.getElementById("TreeDataName").innerHTML = "商城系统账号";
        //    Ext.getCmp("userGridId").columns[4].hide();
        //    Ext.getCmp("userGridId").columns[5].hide();
        //    Ext.getCmp("userGridId").columns[6].hide();
        //
        //    Ext.getCmp("userGridId").down("#DateToolBar").hide();
        //}
        //if (PublicObject.selecTreeData == 4) {//客户系统账号
        //    document.getElementById("TreeDataName").innerHTML = "客户系统账号";
        //
        //    Ext.getCmp("userGridId").down("#DateToolBar").show();
        //}

        //debugger;

    }
});