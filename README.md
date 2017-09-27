# 简单回顾、总结JavaScript基础知识
## 背景
做项目一直用的react相关的技术，忽视了对原生js的复习巩固，朋友问了一个很简单的问题：===和==分别在什么情况下使用，自己居然懵逼了。。。在我的观念里，基础就是万丈高楼的根基，没有很好的根基怎么可能盖起百年不倒的雄伟建筑呢。趁现在项目不是很忙，抓紧简略复习下原生js的知识。复习也不能是漫无目的的瞎看，本文采用了问题->知识点->解答的方式。这样效率要高一点，也不会很快产生厌烦的心理。注意：一些特别简单的就没有浪费时间写 
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
    