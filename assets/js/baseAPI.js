// 开发环境服务器路径地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// // 测试环境服务器路径地址
// let baseURL = ''
// // 生产环境服务器路径地址
// let baseURL = ''

// $.ajaxPrefilter可以在调用$.get()$.post()$.ajax()方法之后会立即触发此事件,接收到ajax响应后,还会触发此方法
$.ajaxPrefilter(function (options) {
    // 1添加根路径
    options.url = baseURL + options.url;
    // 2身份认证
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 3登录拦截
    options.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status !== 0 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html'
        }

    }
})