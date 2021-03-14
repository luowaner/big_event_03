$(function () {
    // 1.点击去注册, 显示注册模块, 隐藏登录模块
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 2.点击去登陆, 显示登录模块, 隐藏注册模块
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 3.自定义验证规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //形参:value：表单的值、item：表单的DOM对象
            let pwd = $(".reg-box input[name='password']").val();
            // console.log(pwd);
            // console.log(value);
            // 判定
            if (value !== pwd) {
                return "两次输入密码不一致"
            }
        }
    });

    // 4.注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $(".reg-box input[name='username']").val(),
                password: $(".reg-box input[name='password']").val(),
            },
            success: (res) => {
                console.log(res);
                // 0=成功,1=失败
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 成功
                layui.layer.msg(res.message, { icon: 6 })
            },

        });
        // 注册成功后切换到登录表单
        $("#link_login").click();
        // 重置form表单
        $('#link_reg')[0].reset()
    });

    // 5.登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: {
                username: $(".login-box input[name='username']").val(),
                password: $(".login-box input[name='password']").val(),
            },
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 提示登录成功信息
                layui.layer.msg(res.massage, { icon: 6 });
                // 保存token
                localStorage.setItem('token', res.token)
                // 跳转到后台页面
                location.href = '/index.html'
            }
        });

    })
});
