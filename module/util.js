/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-30 16:55:14 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-30 17:15:57
 */
define(function() {
    'use strict';
    var util = {
        getFormatDate: function(date, type){
            if (type == 1){
                return '2017-10-01';
            }else{
                return '2017-09-30';
            }
        }
    };

    return util;
});