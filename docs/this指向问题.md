# this指向问题

下面提到的函数指普通函数：
  1. 哪个对象调用该函数，this指向该对象。
  2. 对象函数调用，将一个对象A的函数F赋值给对象B，那么B调用F时的this指向对象B
  3. 构造函数

对于箭头函数：
  1. 它的this是指向定义时所在的对象环境(如window、构造函数)

### 编码理解：

```js
var a = {
      test: function() {
            console.log(this)
      },
      test2: () => {
            console.log(this)
      }
}

var b = {c:1}
b.test = a.test
b.test2 = a.test2

a.test() // a 作为a的方法
b.test() // b 作为b的方法
a.test2() // window 定义时所在的对象环境
b.test2() // window 定义时所在的对象环境
```

```js
function P (name, age, getName, getAge) {
  this.name = name
  this.age = age

  this.test = function() {
    console.log(this)
  }
  this.test2 = () => {
    console.log(this)
  }

  this.getName = getName
  this.getAge = getAge
}

var p1 = new P('xc1', 21, () => {
  console.log(this)
}, function(){
  console.log(this)
})

p1.test3 = function() { console.log(this) }
p1.test4 = ()  => { console.log(this) }

p1.test() // p1实例
p1.test2() // p1实例
p1.test3() // p1实例
p1.test4() // window
p1.getName() // window
p1.getAge() // p1实例
```

```js
function P ({name, age, getName, getAge}) {
  this.name = name
  this.age = age

  this.test = function() {
    console.log(this)
  }
  this.test2 = () => {
    console.log(this)
  }

  this.getName = getName
  this.getAge = getAge

  this.obj = {
    test: function() {
      console.log(this)
    },
    test2: () => {
      console.log(this)
    }
  }
}

var p1 = new P({name:'xc1', age: 21, getName: () => {
  console.log(this)
}, getAge: function(){
  console.log(this)
}})

p1.obj2 = {
    test: function() {
      console.log(this)
    },
    test2: () => {
      console.log(this)
    }
}

p1.test3 = function() { console.log(this) }
p1.test4 = ()  => { console.log(this) }

p1.test() // p1
p1.test2() // p1
p1.test3() // p1
p1.test4() // window
p1.getName() // window
p1.getAge() // p1
p1.obj.test() // p1.obj
p1.obj.test2() // p1
p1.obj2.test() // p1.obj2
p1.obj2.test2() // window
```