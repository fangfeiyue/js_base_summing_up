/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-30 17:16:54 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-30 17:19:19
 */
define(['./util.js'], function(util) {
    'use strict';
    var aUtil = {
        aGetFormateDate: function(date){
            return util.getFormatDate(date, 2);
        }
    };
    return aUtil;
});