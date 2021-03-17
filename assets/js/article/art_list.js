$(function () {
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date();

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return `${y}:${m}:${d}  ${hh}:${mm}:${ss}`
    }

    // 个位数补零
    function padZero(n) {
        return n > 9 ? n : '0' + n;

    }
    // 1.定义提交参数
    let q = {
        pagenum: 1,//告知服务器我们需要的是第几页数据
        pagesize: 2,// 每页能够显示的条目数
        cate_id: '',// 你需要找哪一个分类下的文章，默认是所有文章
        state: '',//你需要查找的是什么状态的文章
    }

    // 2.初始化文章列表
    let layer = layui.layer;
    initTable();
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'GET',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-table', { data: res.data });
                $('tbody').html(htmlStr);
                // 调用分页
                renderPage(res.total)
            }
        });
    };

    // 3.初始化分类
    let form = layui.form;
    initCate();
    // 封装
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-cate', { data: res.data });
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        });
    };

    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 赋值
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        // 赋值
        q.cate_id = cate_id;
        q.state = state;
        // 初始化文章列表
        initTable();
    });
    // 5.分页
    let laypage = layui.laypage;
    function renderPage(total) {
        // alert(total)

        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox',  //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }

            }
        });
    }

    // 6.删除功能
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + Id,
                type: 'GET',
                success: (res) => {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 成功
                    layer.msg('删除成功');
                    if ($('。btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initTable();
                }
            });
            layer.close(index);
        });

    });

})