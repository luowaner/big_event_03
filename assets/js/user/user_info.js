$(function () {
    // 1自定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1-6之间!'
            }
        }
    });
    // 2.获取用户信息渲染到页面
    initUserInfo();
    // 到处layer ,框架
    let layer = layui.layer
    // 封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            Headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功,渲染
                // layer.msg(res.message);
                form.val('formUserInfo', res.data)
            }
        });

    };

    // 3.表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认表单重置行为
        e.preventDefault();
        // 重新渲染
        initUserInfo();
    });
    // 4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 修改成功
                // layer.msg(res.message);
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        });

    })

})