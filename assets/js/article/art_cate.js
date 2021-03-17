$(function () {
    // 1.文章类别列表显示
    initArtCateList();
    // 封装
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: (res) => {
                // console.log(res);
                let htmlStr = template('tpl-art-cate', { data: res.data })
                $('tbody').html(htmlStr);
            }
        });
    }

    // 2.显示添加文章分类列表
    let layer = layui.layer;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html(),
        });

    })
    // 3.提交文章分类添加,事件委托
    let indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                // 添加成功重新渲染页面中的数据
                initArtCateList();
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
            }
        });
    });
    // 4.修改-展示表单
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        });
        // 渲染到页面
        let Id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + Id,
            type: 'GET',
            success: (res) => {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        });
    });

    // 修改后的文章分类重新渲染到页面
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新失败!')
                }
                // 成功
                initArtCateList();
                layer.msg('更新成功');
                layer.close(indexEdit);
            }
        });

    });

    // 5.删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                type: 'GET',
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 删除成功要重新渲染
                    layer.msg('删除成功');
                    layer.close(index);
                    initArtCateList();

                }
            });

        });

    })

});
