# 简单回顾总结JavaScript基础知识
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
1.问题
- 如何准确判断一个变量是数组类型
```
var arr = [];
arr instanceof Array
```
- 写一个原型链继承的例子

- 描述new一个对象的过程
- zepto（或其他框架）源码中如何使用原型链

2.知识点
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
