//实现深拷贝
function extend() {
  const extended = {};
  let deep = false;
  let i = 0;
  const length = arguments.length;
  if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
    deep = arguments[0]; 
    i++;
  }

  for (; i < length; i++) {
    var obj = arguments[i]; 
    merge(obj);
  }

  function merge(obj) {
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
        ) {
          //此处深拷贝，递归的是两个对象再次合并，不要迷
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  }
  return extended;
}

const obj1 = {
  a:'1',
  b:true,
  c:[1,2,3],
  f:{
    a:1,
    b:2
  },
};
const obj2 = {
  a:'456',
  f:{
    d:'123'
  },
  g:123
}
const newobj = extend(obj1,obj2)
console.log(newobj);
const newobj2 = extend(true,obj1,obj2)
console.log(newobj2);