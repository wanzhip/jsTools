//实现深拷贝
 const extend = ()=> {
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

// const obj1 = {
//   a:'1',
//   b:true,
//   c:[1,2,3],
//   f:{
//     a:1,
//     b:2
//   },
// };
// const obj2 = {
//   a:'456',
//   f:{
//     d:'123'
//   },
//   g:123
// }
// const newobj = extend(obj1,obj2)
// console.log(newobj);
// const newobj2 = extend(true,obj1,obj2)
// console.log(newobj2);
/**
 * 
 * @param {*} s 秒变成时分秒
 */
 const secondsFormat = (s) => {
  let hour = Math.floor(s / 3600);
  let minute = Math.floor((s - hour * 3600) / 60);
  let second = Math.floor(s - hour * 3600 - minute * 60);
  if (hour) {
    if (minute < 10) {
      if (second < 10) {
        return hour + ":0" + minute + ":0" + second;
      } else {
        return hour + ":0" + minute + ":" + second;
      }
    } else {
      if (second < 10) {
        return hour + ":" + minute + ":0" + second;
      } else {
        return hour + ":" + minute + ":" + second;
      }
    }
  } else {
    if (minute < 10) {
      if (second < 10) {
        return "00:0" + minute + ":0" + second;
      } else {
        return "00:0" + minute + ":" + second;
      }
    } else {
      if (second < 10) {
        return "00:" + minute + ":0" + second;
      } else {
        return "00:" + minute + ":" + second;
      }
    }
  }
}
// const a = secondsFormat(1000)
// console.log(a);

/**
 * 日期转化函数
 * YYYY-MM-DD HH:MM:SS 时分秒
 * YYYY-MM-DD 日期
 * @param {*} format
 * @param {*} date
 */
 const dateTransfer=(format,date)=>{
  
  if(typeof date == 'object'){
    let oYear = date.getFullYear(),
    oMonth = date.getMonth()+1,  
    oDay = date.getDate(),
    oHour = date.getHours(),
    oMin = date.getMinutes(),
    oSec = date.getSeconds();
    let oTime = '';
    if(format == 'YYYY-MM-DD HH:MM:SS'){
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
    }else if(format == 'YYYY-MM-DD'){
        oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
    }
    return oTime;
  }else if(typeof date == 'string'){
    console.log(date)
    return date;
  }else{
    return new Error('date must be a time object')
  }
};
//补0操作  
function getzf(num){
  if(parseInt(num) < 10){
      num = '0'+num;
  }
  return num;
}

//下载二维码
 const downloadFile = (fileName, content)=> {
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  console.log("点击下载",evt)
  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click()
}
//base64转blob
 const base64ToBlob = (code)=> {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
}


//去除富文本编辑器标签
 const removeTags = (str) => {
  str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  str = str.replace(/ /ig, '');//去掉 
  return str;
}

/**
 * 
 * @param {*} str 毫秒数 
 */
//倒计时
 const leftTimer = (str) => {
  let days = parseInt(str / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
  let hours = parseInt(str / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
  let minutes = parseInt(str / 1000 / 60 % 60, 10);//计算剩余的分钟 
  let seconds = parseInt(str / 1000 % 60, 10);//计算剩余的秒数 

  days = checkTime(days);
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  let time = [days , hours , minutes ,seconds];
  return time;
}
function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const time = leftTimer(24*60*60*1000)
console.log(time);