const https = require('https');
const http = require('http');
/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/douban'
})
// const controllers = require('../controllers')
const host = 'api.douban.com'
router.get('/*', async function (ctx, next) {
    let proxyUrl = '/v2/' + ctx.url.replace(ctx._matchedRoute.replace('*', ''), '')
    let responseBody
    try {
        responseBody = await new Promise(function (resolve, reject) {
            https.get({
                host: host,
                path: proxyUrl
            }, (response) => {
                let code = response.statusCode
                if (code >= 200 && code < 300) {
                    response.on('data', (d) => {
                        resolve(d)
                    });
                    response.on('error', (e) => {
                        reject(e);
                    });
                } else {
                    reject(response)
                }
            })
        })
        ctx.response.body = responseBody.toString()
        next()
    } catch (e) {
        console.log('err:', e)
        ctx.response.body = e.toString()
        next()
    }
})

module.exports = router
