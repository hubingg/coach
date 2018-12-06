const helper = {
  // 获取cookie
  getCookie(name) {
    let arr
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }else{
      return null
    }
  },
  getUrlParam(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    console.log(window.location.search)
    if (r != null) {
        return unescape(r[2]);  //返回参数值 
    } else {
        return null; 
    }
 },
 getParamsFromUrl (name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
  var r = url.substr(1).match(reg);  //匹配目标参数  
  if (r != null) {
      return unescape(r[2]);  //返回参数值 
  } else {
      return null; 
  }
 },
  getHttp (url, callback) {
    var xhr=new XMLHttpRequest()
    xhr.open("get", url)
    xhr.send(null)
    xhr.onreadystatechange=function(){ if(xhr.readyState==4){
      if(xhr.status==200){
        callback(xhr.responseText)
        // console.log(xhr.getResponseHeader('usertoken'))
        // localStorage.setItem('usertoken', xhr.getResponseHeader('usertoken'))
      }else{//若请求失败
        alert('Requst was unsuccessful:'+xhr.status)
      }
     }
    }
  },
  setStorage (key, value) {
    window.localStorage.setItem(key, value)
  },
  formatHourMinutes (time) {
    let date = new Date(time)
    let hour = date.getHours()
    hour = hour < 10 ? '0' + hour : hour
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes
    return `${hour}:${minutes}`
  },
  getStorage (key) {
    console.log(window.localStorage.getItem(key))
    return JSON.parse(window.localStorage.getItem(key)) || {}
  },
  formatMonthDay (time) {
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return `${month}月${day}日`
  },
  formatYearMonth (time) {
    time = time || new Date()
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return `${date.getFullYear()}-${month}`
  },
  formatYearMonthDay (time) {
    time = time || new Date()
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return `${date.getFullYear()}-${month}-${day}`
  },
  formatYearMonthDayV (time) {
    time = time || new Date()
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return `${date.getFullYear()}年${month}月${day}日`
  },
  formatDate (time) {
    time = time || new Date()
    let date = new Date(time)
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    let hour = date.getHours()
    hour = hour < 10 ? '0' + hour : hour
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes
    let seconds = date.getSeconds()
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${date.getFullYear()}-${month}-${day} ${hour}:${minutes}:${seconds}`
  }
}
export default helper
