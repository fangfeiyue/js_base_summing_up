/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-02 08:56:25 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-02 08:58:12
 */

module.exports = {
    print: function(){
        
        console.log('中秋快樂');

        var $ = require('jquery');
        var root = $('#root');

        root.html('歡度國慶，中秋快樂');
    }
};