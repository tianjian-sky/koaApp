const proxy = require('http-proxy-middleware')
/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/douban'
})
// const controllers = require('../controllers')
// router.get('/*', proxy('/', {
//     target: 'https://api.douban.com/v2',
//     changeOrigin: true
// }), function (ctx, next) {
//     console.log(ctx)
// })

module.exports = router
