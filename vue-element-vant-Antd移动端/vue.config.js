/*
 * @Author: seven
 * @Date: 2020-11-10 15:10:05
 * @LastEditTime: 2020-11-10 19:45:35
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \BH_Middle_ground\OrganizationManger\vue.config.js
 * @symbol_custom_string_obkoro1: 博虹出品，抄袭必究😄
 */
module.exports = {
    devServer: {
        port: 9020,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/dev': {
                target: 'https://api.apiopen.top',
                // target:'http://139.9.5.0:9902',
                chainWebpack: true,
                pathRewrite: {
                    '^/dev': ''
                }
            },
        }
    },
    configureWebpack: {
        output: {
            library: 'child',
            libraryTarget: 'umd'
        }
    }
};
