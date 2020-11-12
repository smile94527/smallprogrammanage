let config = {
    "entity": null,
    "childs": [{
        "entity": {
            "id": 1,
            "parentMenuId": 0,
            "name": "交运竞赛系统管理",
            "icon": "el-icon-message",
            "alias": "交运竞赛系统管理",
            "state": "ENABLE",
            "sort": 0,
            "value": null,
            "type": "NONE",
            "createUserId": 1
        },
        "childs": [{
                "entity": {
                    "id": 2,
                    "parentMenuId": 1,
                    "name": "团队管理",
                    "icon": "el-icon-user-solid",
                    "alias": "团队管理",
                    "state": "ENABLE",
                    "sort": 0,
                    "value": "teamPage",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },
            {
                "entity": {
                    "id": 3, //
                    "parentMenuId": 1, //
                    "name": "岗位管理", //
                    "icon": "el-icon-bell", //
                    "alias": "岗位管理",
                    "state": "ENABLE",
                    "sort": 1,
                    "value": "postManage",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },
            {
                "entity": {
                    "id": 4,
                    "parentMenuId": 1,
                    "name": "角色管理",
                    "icon": "el-icon-edit",
                    "alias": "角色管理",
                    "state": "ENABLE",
                    "sort": 2,
                    "value": "roleManagement",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },

            {
                "entity": {
                    "id": 5,
                    "parentMenuId": 1,
                    "name": "菜单管理",
                    "icon": "el-icon-mobile-phone", // 
                    "alias": "菜单管理",
                    "state": "ENABLE",
                    "sort": 3,
                    "value": "menu1",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },
            {
                "entity": {
                    "id": 6,
                    "parentMenuId": 1,
                    "name": "用户管理",
                    "icon": "el-icon-mobile-phone",
                    "alias": "用户管理",
                    "state": "ENABLE", // 
                    "sort": 4, // sortNo
                    "value": "userManage", //url
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },
            {
                "entity": {
                    "id": 7,
                    "parentMenuId": 1,
                    "name": "系统管理",
                    "icon": "el-icon-mobile-phone",
                    "alias": "系统管理",
                    "state": "ENABLE",
                    "sort": 5,
                    "value": "userManagement",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },
            {
                "entity": {
                    "id": 8,
                    "parentMenuId": 1,
                    "name": "系统字典管理",
                    "icon": "el-icon-mobile-phone",
                    "alias": "系统字典管理",
                    "state": "ENABLE",
                    "sort": 6,
                    "value": "dictionary",
                    "type": "LINK",
                    "createUserId": 1
                },
                "childs": null
            },

        ]
    }, ]
}
export default config