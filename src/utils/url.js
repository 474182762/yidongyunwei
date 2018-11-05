
const baseUrl = 'http://yy.test.worthcloud.net';

/*用户*/

export const login = baseUrl+'/login/login'  //登录

export const log_out = baseUrl+'/login/log_out'  //退出

export const change_password = baseUrl+'/login/change_password'  //修改密码

export const modify_information = baseUrl+'/member/modify_information'  //修改个人信息


/*系统管理*/

export const get_users = baseUrl+'/member/get_users'  //查询用户

export const create_user = baseUrl+'/member/create_user'  //创建用户

export const change_role = baseUrl+'/member/change_role'  //改变用户角色

export const del_user = baseUrl+'/member/del_user'  //删除用户

export const disable_user = baseUrl+'/member/disable_user'  //禁用/恢复禁用 用户

export const get_userinfo = baseUrl+'/member/get_userinfo'  //获取账号信息

export const save_role = baseUrl+'/role/save_role'  //添加 / 修改 一个角色

export const del_role = baseUrl+'/role/del_role'  //删除一个角色

export const get_roles = baseUrl+'/role/get_roles'  //获得角色列表

export const get_users_by_role = baseUrl+'/role/get_users_by_role'  //根据角色获得用户信息

export const get_logs = baseUrl+'/common/get_logs'  //获取日志

export const get_jurisdiction = baseUrl+'/login/get_jurisdiction'  //获得权限列表

export const get_role_rules = baseUrl+'/role/get_role_rules'  //根据角色id获取角色信息

export const get_users_role_or = baseUrl+'/role/get_users_role_or'  //获得一个角色的用户列表和非该角色的用户列表


/*开发者后台管理*/

export const get_accounts = baseUrl+'/account/get_accounts'  //查询账号列表

export const save_account = baseUrl+'/account/save_account'  //添加/修改一个账号

export const get_account = baseUrl+'/account/get_account'  //获取单个用户的详细信息

export const del_account = baseUrl+'/account/del_account'  //删除一个账号

export const get_apps = baseUrl+'/app/get_apps'  //获取应用列表

export const get_app = baseUrl+'/app/get_app'  //获取一个应用的详细信息

export const create_app = baseUrl+'/app/create_app'  //创建一个新的应用

export const disabled_app = baseUrl+'/app/disabled_app'  //禁用/恢复应用

export const del_app = baseUrl+'/app/del_app'  //删除应用

export const update_app = baseUrl+'/app/update_app'  //更新应用信息

export const add_sdk = baseUrl+'/sdk/add_sdk'  //添加/修改SDK

export const sdk_list = baseUrl+'/sdk/sdk_list'  //获取SDK列表

export const get_sdk = baseUrl+'/sdks/get_sdk'  //获取一个SDK信息

export const del_sdk = baseUrl+'/sdk/del_sdk'  //删除一个SDK

export const reset_secret = baseUrl+'/app/reset_secret'  //修改应用secret_key



/*上传*/

export const get_token = baseUrl+'/qin/get_token'  //获取七牛云token


/*设备管理*/

export const batch_list = baseUrl+'/uuid/batch_list'  //获取UUid

export const get_batch = baseUrl+'/uuid/get_batch'  //获取UUid信息

export const del_batch = baseUrl+'/uuid/del_batch'  //删除UUid

export const batch_add = baseUrl+'/uuid/batch_add'  //新增UUid

export const excel_output = baseUrl+'/uuid/excel_output'  //新增UUid

export const version_list = baseUrl+'/versions/version_list'  //固件列表

export const add_version = baseUrl+'/versions/add_version'  //添加固件

export const get_version = baseUrl+'/versions/get_version'  //获取一个固件信息

export const add_version_type = baseUrl+'/versions/add_version_type'  //添加固件类型

export const version_types = baseUrl+'/versions/version_types'  //固件类型列表

export const del_version = baseUrl+'/versions/del_version'  //删除固件

export const update_version = baseUrl+'/versions/update_version'  //修改/更新一个固件的信息


export const get_type_versions = baseUrl+'/versions/get_type_versions'  //获取一个固件名称里面的最新版本和历史版本内容

export const device_list = baseUrl+'/devices/device_list'  //设备列表

export const get_progress = baseUrl+'/devices/get_progress'  //查询升级结果

export const set_name = baseUrl+'/devices/set_name'  //修改设备名

export const upgrade_device = baseUrl+'/devices/upgrade_device'  //远程升级

export const get_device_version = baseUrl+'/devices/get_device_version'  //设备升级接口获取设备版本

export const cameractl_restart = baseUrl+'/devices/cameractl_restart'  //重启摄像头

export const set_camera_flip = baseUrl+'/devices/set_camera_flip'  //180度翻转摄像头

export const set_time_zone = baseUrl+'/devices/set_time_zone'  //设置设备时区

export const get_device = baseUrl+'/devices/get_device'  //获取一个设备的详细信息

export const mac_ids = baseUrl+'/uuid/mac_ids'  //获取一个设备的详细信息

