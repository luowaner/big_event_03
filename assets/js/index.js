$(function () {
    // 获取用户信息
    getUserInfo();
    // 退出功能
    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //清空本地token
            localStorage.removeItem('token');
            // 跳转登录页面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
        });
    });


});
// 封装:获取用户信息函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.massage);
            }
            // 请求成功,渲染头像
            renderAvatar(res.data)
        }
    });
}

// 封装渲染头像函数
function renderAvatar(user) {
    // console.log(user);
    // 获取用户信息
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 判定
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}