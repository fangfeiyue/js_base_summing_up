# 简单回顾、总结JavaScript基础知识
## 背景
做项目一直用的react相关的技术，忽视了对原生js的复习巩固，朋友问了一个很简单的问题：===和==分别在什么情况下使用，自己居然懵逼了。。。在我的观念里，基础就是万丈高楼的根基，没有很好的根基怎么可能盖起百年不倒的雄伟建筑呢。趁现在项目不是很忙，抓紧简略复习下原生js的知识。复习也不能是漫无目的的瞎看，本文采用了问题->知识点->解答的方式。这样效率要高一点，也不会很快产生厌烦的心理。注意：一些特别简单的就没有浪费时间写 
## 下载源码
```
git clone https://github.com/fangfeiyue/js_base_summing_up.git
```
## 运行项目
每个文件都是单独的html文件，下载下来后，直接双击文件在浏览器运行即可
# 正题
## 变量类型和计算
1.JS中使用typeof能得到哪些类型
- undefined
- Number
- Boolean
- String
- Object
- Function

2.何时使用===何时使用==
```
if (obj.a == null){
    //这里相当于obj.a === null || obj.a === undefined的简写形式
    //这是jq源码中推荐的写法
}
```
3.JS中有哪些内置函数 
- Object
- Array
- Boolean
- Number
- String
- Function
- Date
- RegExp
- Error
4.JS变量按照存储方式区分为哪些类型，并描述其特点
- 值类型
值类型的值不会相互干涉。
```
var a = 1;
var b = a;
a = 4;
console.log(a); //4
console.log(b); //1
```
- 应用类型
引用类型因为共用了一块存储空间，赋值是变量指针的赋值，而不是真正值的拷贝，修改他们的值会互相影响。
```
var a = {name:'123'};
var b = a; 
a.name = '456';
console.log(a.name);//456
console.log(b.name);//456
```
5.如何理解JSON

JSON是一种数据格式也是JS种的一个对象

6.强制类型转换
- 字符串拼接
- == 运算符
- if语句
- 逻辑运算
## 原型原型链
### 1.知识点
- 创建对象有几种方法
    - 第一类
    ```
    var obj1 = {name: 'ff'};
    var obj2 = new Object({name: 'ff'});
    ```
    - 第二种
    ```
    var M = function(name){this.name = name;}
    ```
    - 第三种
    ```
    var P = {name: 'obj'};
    var obj3 = Object.create(P);
    ```
- 原型、构造函数、实例、原型链
![原型、构造函数、实例、原型链关系图](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/ECFB29250AE14EAC987951F0EFB983A2/17822)
- instanceof的原理
- new运算符
---
- 构造函数

用new来生成实例的函数都是构造函数
- 构造函数 - 扩展

var obj = {}是obj = new Object()的语法糖
- 原型规则和示例
    - 所有的引用类型都具有对象特性，即可扩展属性(除了null)
    - 所有的引用类型都有一个_proto_属性，属性值是一个对象
    - 所有的函数，都有一个prototype属性，属性值也是一个对象
    - 当试图得到一个对象的某个属性时，如果对象本身没有这个属性，会去它的_proto_(即它的构造函数的prototype)中寻找
```
function F(name){
    this.name = name;
}
F.prototype.printName = function(){
    console.log('printName===>', this.name);
}
var f = new F('f');

for (item in f){
    //只输出f自身的属性，不输出原型对象上的
    if (f.hasOwnProperty(item)){
        console.log('f===>', item);//name
    }
}
```
- 原型链

![原型链](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/987AAE1E2D9B420394DE2778C97E1A79/17816)
- instanceof
### 2.问题
- 如何准确判断一个变量是数组类型
```
var arr = [];
arr instanceof Array
```
- 写一个原型链继承的例子
```
function Parent(){
    this.name = "ff";
}

function Children(){
    Parent.call(this);
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;

var children = new Children();
```
- 描述new一个对象的过程
    - 创建一个新对象
    - this指向这个新对象
    - 执行构造函数，对this赋值
    - 返回this

## 变量提升
```
fn1();
// 函数声明
function fn1(){}

fn2();//报错,报错的原因是把var fn2提前了，var fn2 = undefined;
// 函数表达式
var fn2 = function(){}


console.log(a);//undefined 提前：var a = undefined;
var a = 100;
```

## 作用域和闭包
### 1.知识点
- 执行上下文
- this
    - this要在执行时才能确认值，定义时无法确认
    ```
    var a = {
        name: 'A',
        fn: function(){
            console.log(this.name);
        }
    };
    a.fn();//A
    a.fn.call({name:'B'});//B
    var fn1 = a.fn;
    fn1();//""

    //call apply
    function fn1(name, age){
        console.log(name);
        console.log(this);
    }
    // fn1.call({}, 'ffy');
    // fn1.apply({}, ['ffy']);

    //call apply实际应用，cat有eat方法，dog不想重复声明eat方法，可以用call来改变this的指向
    function Dog(){this.name = 'dog';}
    function Cat(){this.name = 'cat';}
    Cat.prototype.eat = function(){console.log('eat');};

    var cat = new Cat;
    var dog = new Dog;
    cat.eat();//eat
    cat.eat.call(dog);//eat
    ```
- 作用域
    - JS没有块级作用域
    - 只有函数和全局作用域 
- 作用域链
- 闭包
- 闭包的使用场景
    - 函数作为返回值
    ```
    function f1(){
        var a = 100;
        return function(){
            console.log(a);
            }
    }

    var f = f1();
    var a = 200;
    f(); //100
    ```
    - 函数作为参数传递
    ```
    function f(){
        var a = 100;
        return function(){
            console.log(a);
        }
    }    
    var f1 = f();
    
    function f2(fn){
        var a = 200;
        fn();
    }

    f2(f1); //100
    ```
### 2.问题
- 说一下变量提升的理解
- 说明this几种不同的使用场景
    - 作为构造函数执行
    - 作为对象属性执行
    - 作为普通函数执行
    - call、apply、bind
- 创建10个a标签，点击的时候弹出来对应的序号
```
for (var i = 0; i < 10; i++) {
    (function (i) {
        a = document.createElement('a');
        a.innerHTML = i + '<br/>';
        a.addEventListener('click', function (e) {
            e.preventDefault();
            alert(i);
        });
        document.body.appendChild(a);
    })(i);
}
```
- 如何理解作用域
    - 自由变量
    - 作用域链，即自由变量的查找
    - 闭包的两个场景
- 实际开发中闭包的应用
    - 闭包实际应用中主要用于封装变量，收敛权限
    ```
    function isFirstLoad(){
        var _list = [];
        return function(id){
            if (_list.indexOf(id) >=0 ){
                return false;
            }else{
                _list.push(id);
                return true;
            }
        }
    }
    ```
## 异步和单线程
### 知识点
- 什么是异步

- 前端使用异步的场景
    - 定时任务
    - 网络请求：ajax请求，动态img加载
    - 事件绑定
- 异步和单线程
### 题目 
- 同步异步的区别是什么？分别举一个同步异步的例子
    - 同步会阻塞代码执行，而异步不会
    - alert()是同步，setTimeOut是异步
- 一个关于setTimeout的笔试题
    ```
    console.log(1);
    setTimeout(function() {
        console.log(2);
    }, 0);
    console.log(3);
    setTimeout(function() {
        console.log(4);
    }, 1000);
    console.log(5);
    //1   3   5   2   4
    ```
- 前端使用异步的场景有哪些
    - 定时任务
    - 网络请求：ajax请求，动态img加载
    - 事件绑定
## 日期和Math
### 1.知识点
- 日期
```
Date.now();//获取当前时间毫秒数
var dt = new Date();
dt.getTime();//获取毫秒数
dt.getFullYear();//年
dt.getMonth();//月（0-11）
dt.getDate();//日（0-31）
dt.getHours();//小时（0-23）
dt.getMinutes();//分钟（0-59）
dt.getSeconds();//秒（0-59）
```
- Math
```
Math.random();//获取随机数[0,1)
```
- 数组API
- forEach 遍历所有元素
```
var arr = [1, 2, 3];
arr.forEach(function(item, index){
    console.log(item,'--->',index);
});
```
- every   判断所有元素是否都符合条件
```
var arr = [1, 2, 3, 4, 5];
var result = arr.every(function(item, index){
    if (item < 4){
        return true;
    }
});
console.log(result); // false
```
- some    判断是否有至少一个元素符合条件
```
var arr = [1, 2, 3, 4, 5];
var result = arr.some(function(item, index){
    if (item < 4){
        return true;
    }
});
console.log(result); // true
```
- sor     排序
```
var arr = [4, 2, 33, 56, 12];
var arr2 = arr.sort(function(a, b){
    //从小到大a-b
    //从大到小b-a
    return a - b;
});
console.log(arr2); //[2, 4, 12, 33, 56]
```
- map     对元素重新组装，生成新数组
```
var arr = [4, 2, 33, 56, 12];
var arr2 = arr.map((item, index)=>('_' + item + '_'));
console.log(arr2); //["_4_", "_2_", "_33_", "_56_", "_12_"]
```
- filter  过滤符合条件的元素
```
var arr = [4, 2, 33, 56, 12];
var arr2 = arr.filter((item, index)=>{
    if (item > 2){
        return true;
    }
});
console.log(arr2); //[4, 33, 56, 12]
```
- 对象API
```
var obj = {
    name: 'ffy',
    age: 18
};
for (var key in obj){
    console.log(key);//name age
}
```
### 2.题目
- 获取2017-xx-xx格式的日期
```
// 补零操作
function fillZero(param){
    if (param < 10){
        return '0' + param;
    }
    return param;
} 

// 日期格式
function formatDate(date){
    if (!date){
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    month = fillZero(month);
    day = fillZero(day);

    return year + '-' + month + '-' + day;
}

console.log(formatDate(new Date()));
```
- 获取随机数，要求是长度一致的字符串格式
```
var random = Math.random();
random += '0000000000';
random = random.slice(0, 10);
console.log(random);
```
- 写一个能遍历对象和数组的通用的forEach函数
```
var arr = [3, 4, 5, 6];
var obj = {name:'ffy', age:18};

forEach(arr);
forEach(obj);

function forEach(param){
if (param instanceof Array){
    param.forEach(function(item, index){
        console.log(index, '------>', item);
    });
}else{
    for(var item in param){
        console.log(item, '------>', param[item]);
    }
}   
}
```
## 事件
### 知识点
- 通用事件绑定
```
var btn = document.getElementById('btn');
function bindEvent(ele, type, fn){
    ele.addEventListener(type, fn);
}
bindEvent(btn, 'click', function(){
    alert('成功点击了我！！！');
});
```
- 事件冒泡
- 代理
```
var box = document.getElementById('box');

bindEvent(box, 'click', 'button', function(e){
    console.log(this.innerHTML);
});

function bindEvent(ele, type, selector, fn){
    if (!fn){
        fn = selector;
        selector = null;
    }
    ele.addEventListener(type, function(e){
        if (selector){
            var target = e.target;
            if (target.matches(selector)){
                fn.call(target, e);
            }
        }else{
            fn(e);
        }
    });
}
``` 
### 题目 
- 编写一个通用的事件监听函数
- 描述事件冒泡流程
- 对于一个无限下拉加载图片页面，如何给每个图片绑定事件
- 代理的优点
    - 代码比较简洁
    - 给浏览器的压力比较小，效率高
## Ajax
### 知识点
- XMLHttpRequest
```
var xhr = new XMLHttpRequest();
xhr.open('GET', "/api", false);
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if (xhr.status == 200){
            console.log(xhr.responseText);
        }
    }
};
xhr.send(null);
```
- 状态码说明

    readyState：
    - 0 (未初始化)还没有调用send方法
    - 1 (载入)已经调用send()方法，正在发送请求
    - 2 (载入完成)send方法执行完成，已经接受到全部响应内容
    - 3 (交互)正在解析响应内容
    - 4 (完成)响应内容解析完成，可以在客户端调用了

    status:
    - 2xx 表示成功处理请求  200
    - 3xx 需要重定向，浏览器直接跳转 
    - 4xx 客户端请求错误   404
    - 5xx 服务端错误
- 跨域 
    - 跨域条件：协议、域名、端口号有一个不同就算跨域
    - 三个可以跨域的标签：
        - img
        - script
        - link
- JSONP

- 服务器端设置http header
另一个解决跨域的简单方法，需要服务器端来做

![服务器端设置http header](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/50549C9315D649559E1368BCF680A347/17818)
### 题目 
- 手动编写一个ajax，不依赖第三方库
- 跨域的几种实现方式
## 存储
### 知识点
- cookie
    - 本身用于客户端和服务端通信，但是它有本地存储的功能，于是就被借用
    - 缺点： 
        - 存储量太小，只有4kb
        - 所有的http请求都带着，会影响获取资源的效率
        - API简单，需要封装才能用
- sessionStorage和localStorage
    - H5专门为存储设计，最大容量5M
    - API简单易用
        - localStorage.setItem(key, value);
        - localStorage.getItem(key);
    - iOS safari隐藏模式下localStorage.getItem会报错，建议统一使用try-catch封装 

### 题目
- 请描述下cookie，sessionStorage和localStorage的区别
    - 容量
    - 是否会携带到ajax中
    - API易用性
## Dom   Document Object Model
### 知识点
- DOM事件级别
    - DOM0
    ```
    element.onclick = function(){}
    ```
    - DOM2
    ```
    element.addEventListener('click', function(){});
    ```
    - DOM3增加了一些事件，比如鼠标事件、键盘事件
    ```
    element.addEventListener('keyup', function(){});
    ```
- DOM事件模型
    - 捕获
    - 冒泡
- DOM事件流
事件通过捕获到达目标元素(目标阶段)，从目标元素再上传(冒泡)到window对象。
- 描述DOM事件捕获的具体流程
window-->document-->html（document.documentElement）-->body...-->目标元素
- Event对象的常见应用
    - event.preventDefault()    阻止默认事件
    - event.stopPropagation()   阻止冒泡
    - event.stopImmediatePropagation()  于阻止剩余的事件处理函数的执行，并防止当前事件在DOM树上冒泡
    - event.currentTarget   绑定事件的元素
    - event.target  响应事件的元素
- 自定义事件
    - Event
    ```
    var btn = document.getElementById('btn');
    var event = new Event('custome');

    btn.addEventListener('custome', function(){
        console.log('custome event');
    });

    btn.dispatchEvent(event);
    ```
    -  CustomEvent除了可以指定事件名，还可以带一些数据。注意：第二个参数不是必须的，如果写第二个参数，第二个参数必须为Object类型。
    ```
    var myEvent = new CustomEvent('userInfo', {
        detail:{
            username: 'fff'
        }
    });

    testBtn.addEventListener('userInfo', function(e){
        console.log(e);
        console.log(e.detail);
    });

    testBtn.dispatchEvent(myEvent);
    ```
---
- DOM本质
DOM可以理解为浏览器把拿到的html代码，结构化一个浏览器能识别并且JS可操作的一个模型而已
- DOM节点操作
    - 获取DOM节点
    - prototype

    js对象的一个属性
    - Attribute
    
    html标签的属性
- DOM结构操作
    - nodeName 元素的节点名称
    - nodeType 元素的节点类型
    - 新增节点
    ```
    // 新增节点
    var div1 = document.getElementById('div1');
    var p = document.createElement('p');
    p.innerHTML = 'hello world';
    div1.appendChild(p);
    // 移动已有节点
    var div2 = document.getElementById('div2');
    div2.appendChild(p);
    ```
    - 获取父元素、子元素
    ```
    // 获取父元素和子元素
    var div = document.getElementById('div3');
    var child = div.childNodes;
    //删除节点
    child = div.removeChild(child[1]);
    console.log(child);
    ``` 
### 题目
- Dom是哪种的基本数据类型
树
- DOM操作的常用API有哪些
- DOM节点的attr和property有何区别
    - property只是一个JS对象的属性的修改
    - attribute是对html标签属性的修改
## BOM操作 Browser Object Model
### 知识点
- navigator
```
var ua = navigator.userAgent;
var isChrome = ua.indexOf('Chrome');
console.log(isChrome);
```
- screen
```
console.log(screen.width);
console.log(screen.height);
```
- location
```
//file:///Users/fangfeiyue/Desktop/GuoAn/jsBase/17BOM.html
console.log(location.href);
console.log(location.protocol);//file:
console.log(location.pathname);///Users/fangfeiyue/Desktop/GuoAn/jsBase/17BOM.html
console.log(location.search); // 得到?后面的字符串 
console.log(location.hash); // 得到#后面的字符串
```
- history
```
history.back();
history.forward();
```
### 题目 
- 如何检测浏览器的类型
- 拆解url各部分  

## Git
### git常用命令
- git add .                 添加所有修改的文件
- git clone url             从远程下载git仓库
- git branch                创建分支 
- git checkout xxx          切换分支
- git checkout -b xxx       新建一个分支
- git merge xxx             合并分支                
- git add xxx               添加某个文件
- git commit -m '备注'       将代码提交到本地库 
- git push origin master    将代码推送到远程仓库
- git pull origin master    拉去远程仓库的代码

### 命令行中创建Git仓库
- git init
- git add .
- git commit -m 'xxx'
- git remote add origin url
- git push -u origin master

### git起别名
- git config --global alias.st status
- git config --global alias.co checkout
- git config --global alias.ci commit
- git config --global alias.br branch

## 模块化
### 知识点
- 不适用模块化
    - 函数中的代码必须是全局变量，才能暴露给使用方，全局变量污染
    - 文件引用必须严格遵照顺序,文件过多，很有可能弄错
    - 依赖关系模糊
- AMD（异步模块定义）require.js的使用
    - 第一步创建index.html引入require.js
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>

        <script
        data-main="./main.js" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
    </body>
    </html>
    ```
    - 第二步 创建底层js    util.js
    ```
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
    ```
    - 第三步 创建a-util.js
    ```
    define(['./util.js'], function(util) {
        'use strict';
        var aUtil = {
            aGetFormateDate: function(date){
                return util.getFormatDate(date, 2);
            }
        };
        return aUtil;
    });
    ```
    - 第四步 创建a.js
    ```
    define(['./a-util.js'], function(aUtil) {
        'use strict';
        var a = {
            printDate: function(date){
                console.log(aUtil.aGetFormateDate(date));
            }
        };
        return a;
    });
    ```
    - 第五步 创建main.js
    ```
    require(['./a'], function(a){
        var date = new Date();
        a.printDate(date);
    });
    ```
    - 第六步 在引入require.js的script标签中引入main.js：data-main="./main.js"
    ```
    <script
        data-main="./main.js" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
    ```
- CMD   

- AMD和CMD的使用场景
    - 需要异步加载JS --- AMD
    - 使用了npm的话，建议使用 --- CMD

- 构建工具
    - webpack的初步使用
        - npm init,然后输入项目的名称等信息即可，如果只是测试用，不想输入这些可以运行npm init -y
        - 安装webpack，npm install webpack --save-dev,如果在安装的过程中报
        ```
        Refusing to install webpack as a dependency of itself
        ```
        这个错，是因为上一步我们运行npm init后生成的package.json文件中name的名字为webpack，换一个新名字即可。
        - 新建src文件夾，并在裡面新建app.js文件,輸入測試代碼：
        ```
        console.log('webpack success');
        ```
        - 創建webpack配置文件:webpack.config.js
        ```
        var path = require('path');
        var webpack = require('webpack');

        module.exports = {
            context: path.resolve(__dirname, './src'),
            entry: {
                app: './app.js'
            },
            output: {
                path: path.resolve(__dirname, './dist'),
                filename: 'bundle.js'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ]
        };
        ```
        - 終端運行 webpack,此時我們會看到在我們的項目中自動創建了一個dist文件夾，裡面包含有bundle.js，我們將這個文件引入index.html頁面，啟動運行inde.html，控制台會輸出webpack success
    - 快速在浏览器启动静态html页面，只限于静态页面哦
        - npm install -g http-server --save-dev
        - http-server -p 端口号
        - 运行成功后，终端会输出几个可用的地址
        ```
        Starting up http-server, serving ./
        Available on:
        http://127.0.0.1:8881
        ```
        - 任选其中一个地址将其输入到浏览器运行就能打开html页面了：
### 上线回滚
- 上线流程要点
    - 代码提交到master分支
    - 将当前服务器的代码全部打包并记录版本号，备份
    - 将master分支的代码提交覆盖到线上服务器，生成新版本号
- 回滚流程要点
    - 将当前服务器代码打包并记录版本号，备份
    - 将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号
### linux的基本命令
- 创建新文件夹： mkdir xxx
- 删除文件夹：rm -rf xxx
- 拷贝文件：cp xxx xxx
- 移动文件：mv xxx xxx
- 删除文件：rm xxx
- 查看文件内容：cat xxx
- 查看文件开头的几行：head -n x xxx
- 查看文件结尾的几行：tail -n x xxx
- 搜索带xxx的内容：grep x xxx
## 运行环境
### 知识点
- 页面加载过程
    - 加载资源的形式
        - 输入url（或跳转页面）加载html
        - 加载html中的静态资源
    - 加载一个资源的过程
        - 浏览器根据DNS服务器得到域名的IP地址
        - 向IP的机器发送http请求
        - 服务器收到、处理并返回http请求
        - 浏览器得到返回内容
    - 浏览器渲染页面的过程
        - 根据html生成DOM Tree
        - 根据css生成CSSOM
        - 将DOM和CSSO整合成Render Tree
        - 遇到script时，会执行并阻塞渲染
- window.onload和DOMContentLoaded的区别
    - window.onload：页面的资源全部加载完才执行，包括图片、视频等
    - DOMContentLoaded：Dom渲染完即可执行，此时图片、视频还没有加载完
- 性能优化
- 安全性
### 题目
- 从输入url到得到html的详细过程
## 性能优化
- 原则
    - 多使用内存、缓存或者其他方法
    - 减少CPU计算，减少网络请求
- 从哪里入手
    - 加载页面和静态资源
        - 静态资源的压缩、合并
        - 静态资源缓存
        - 使用CDN让让资源加载更快
        - 使用SSR后端渲染，数据直接输出到HTML中
    - 页面渲染
        - CSS放前面，js放后面
        - 懒加载(图片懒加载，下拉加载更多)
        ```
        <img id="img" src="pre.jpg", data-real="real.jpg">
        <script>
            var img = document.getElementById('img);
            img.src = img.getAttribute('data-real);
        </scrpit>
        ```
        - 减少DOM查询，对DOM查询做缓存
        ```
        var dom = document.getElementById('dom');
        ```
        - 减少DOM操作，多个操作尽量合并在一起操作
        ```
        <script>
            var x, li,
            listNode = document.getElementById('listNode'),
            frag = document.createDocumentFragment();

            for (x = 0; x < 10; x++){
                li = document.createElement('li');
                li.innerHTML = "List item" + x;
                frag.appendChild(li);
            }
            listNode.appendChild(frag);
        </script>
        ```
        - 事件节流
        ```
        <script>
            var textArea = document.getElementById('text'),
            timeoutId;
            textArea.addEventListener('keyup', function(){
                if (timeoutId){
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function() {
                    //触发事件
                }, 100);
            });
        </script>
        ```
        - 尽早执行操作（如DOMContentLoaded）
### XSS 跨站请求攻击
### XSRF 跨站请求伪造

## 个人简介
作者：房飞跃

博客地址：[前端网](http://www.qdfuns.com/house/31986/note)  [博客园](https://www.cnblogs.com/fangfeiyue)  [GitHub](https://github.com/fangfeiyue)

职业：web前端开发工程师

爱好：探索新事物，学习新知识

座右铭：一个终身学习者

## 联系方式
坐标：北京

QQ：294925572

微信：

![XinShiJieDeHuHuan](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/100D55934BB446839482D3EA0CDC3E8D/17820)
