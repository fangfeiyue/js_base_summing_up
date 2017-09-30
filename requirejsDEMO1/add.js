/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-30 23:47:28 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-30 23:51:09
 */
define(['./util.js'], function(add) {
    'use strict';
    return {
        result: function(a, b){
            add.add(a, b);
        }
    }
});