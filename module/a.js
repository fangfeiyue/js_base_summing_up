/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-30 17:19:24 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-30 17:21:18
 */
define(['./a-util.js'], function(aUtil) {
    'use strict';
    var a = {
        printDate: function(date){
            console.log(aUtil.aGetFormateDate(date));
        }
    };
    return a;
});