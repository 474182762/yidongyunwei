// export const menuList=[
//     {
//       menuname:'数据统计',
//         id:0,
//         list:[
//             {
//                 name:'数据统计1',
//                 icon:'el-icon-sold-out',
//                 url:'www.baidu.com'
//             },
//             {
//                 name:'数据统计2',
//                 icon:'el-icon-sold-out',
//                 url:'www.baidu.com'
//             },
//             {
//                 name:'数据统计3',
//                 icon:'el-icon-sold-out',
//                 url:'www.baidu.com'
//             }
//         ]  
//     },
//     {
//         menuname:'设备管理',
//         id:1,
//         list:[
//             {
//                 name:'设备列表',
//                 icon:'icon-liebiao',
//                 url:'/devices'
//             },
//             {
//                 name:'固件管理',
//                 icon:'icon-shexiangji',
//                 url:'/devices/hardware'
//             },
//             {
//                 name:'UUID管理',
//                 icon:'icon-ID',
//                 url:'/devices/UUid'
//             }
//         ]
//     },
//     {
//         menuname:'开发者后台',
//         id:2,
//         list:[
//             {
//                 name:'账号管理',
//                 icon:'icon-qunfengzhanghaoshezhi-copy',
//                 url:'/developer'
//             },
//             {
//                 name:'应用管理',
//                 icon:'el-icon-sold-out',
//                 url:'/developer/applyList'
//             },
//             {
//                 name:'SDK管理',
//                 icon:'el-icon-sold-out',
//                 url:'/developer/sdklist'
//             },
//             {
//                 name:'文档管理',
//                 icon:'el-icon-sold-out',
//                 url:'/developer'
//             }
//         ]
//     },
//     {
//         menuname:'系统管理',
//         id:3,
//         list:[
//             {
//                 name:'账号管理',
//                 icon:'el-icon-sold-out',
//                 url:'/system'
//             },
//             {
//                 name:'角色管理',
//                 icon:'el-icon-sold-out',
//                 url:'/system/systemrole'
//             },
//             {
//                 name:'系统日志',
//                 icon:'el-icon-sold-out',
//                 url:'/system/systemlog'
//             }
//         ]
//     }
// ]
export const menuList=[
    [
        {
            name:'数据统计a',
            icon:'el-icon-sold-out',
            url:'/dataAnalysis',
            active:true
        },
        {
            name:'数据统计b',
            icon:'el-icon-sold-out',
            url:'/dataAnalysis',
            active:false
        },
        {
            name:'数据统计c',
            icon:'el-icon-sold-out',
            url:'/dataAnalysis',
            active:false
        }
    ],
    [
        {
            name:'设备列表',
            id:'1',
            icon:'icon-liebiao',
            url:'/home',
            active:true
        },
        {
            name:'固件管理',
            id:'2',
            icon:'icon-shexiangji',
            url:'/home/hardware',
             active:false
        },
        {
            name:'UUID管理',
            id:'3',
            icon:'icon-ID',
            url:'/home/UUid',
             active:false
        }
    ],
    [
        {
            name:'账号管理',
            id:'1',
            icon:'icon-qunfengzhanghaoshezhi',
            url:'/home/developer',
             active:true
        },
        {
            name:'应用管理',
            id:'2',
            icon:'icon-qingyingyongxuanzhong',
            url:'/home/applyList',
             active:false
        },
        {
            name:'SDK管理',
            id:'3',
            icon:'icon-tiaoma2',
            url:'/home/sdklist',
             active:false
        }
        // {
        //     name:'文档管理',
        //     id:'4',
        //     icon:'el-icon-sold-out',
        //     url:'/developer'
        // }
    ],
    [
        {
            name:'账号管理',
            id:'1',
            icon:'icon-geren',
            url:'/home/system',
            active:true
        },
        {
            name:'角色管理',
            id:'2',
            icon:'icon-jiaoseguanli',
            url:'/home/systemrole',
            active:false
        },
        {
            name:'系统日志',
            id:'3',
            icon:'icon-Processlog',
            url:'/home/systemlog',
            active:false
        }
    ]
]