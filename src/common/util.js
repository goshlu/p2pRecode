export default {
  dataFormate(dateStr, pattern = '') {
    // 根据给定的时间字符串，得到特定的时间
    var dt = new Date(dateStr)

    // padStart(2,'0')  将时间 补全 如 15：6：8  补全为：15：06：08
    // yyyy-mm-dd
    var y = dt.getFullYear()
    var m = (dt.getMonth() + 1).toString().padStart(2,'0') 
    var d = dt.getDate().toString().padStart(2,'0')

    // return y+'-'+m+'-'+d

    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
      return `${y}-${m}-${d}`
    } else {
      var hh = dt.getHours().toString().padStart(2,'0')
      var mm = dt.getMinutes().toString().padStart(2,'0')
      var ss = dt.getSeconds().toString().padStart(2,'0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  }

}