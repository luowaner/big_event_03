// 开发环境服务器路径地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// // 测试环境服务器路径地址
// let baseURL = ''
// // 生产环境服务器路径地址
// let baseURL = ''

// $.ajaxPrefilter可以在调用$.get()$.post()$.ajax()方法之后会立即触发此事件,接收到ajax响应后,还会触发此方法
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url
})