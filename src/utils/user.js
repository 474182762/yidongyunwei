/*获取用户信息*/
export function getUser(){

    let userInfo =null;

    userInfo=JSON.parse(localStorage.getItem('userinfo'))

    return userInfo
}


/*获取账号信息*/
export function getAccount(){

    let account =null;

    account=JSON.parse(localStorage.getItem('account'))
    
    return account
}