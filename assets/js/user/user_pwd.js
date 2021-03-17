$(function () {
    // 1.定义校验规则
    let form = layui.form;
    form.verify({
        //密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不可重复
        samePwd: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return "新旧密码不可相同"
            }
        },
        // 新密码和确认密码必须相同
        rePwd: function (value) {
            if (value !== $('[name="newPwd" ]').val()) {
                return "两次新密码输入不一致"
            }

        },
    });

    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 密码修改成功
                layui.layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    })
})