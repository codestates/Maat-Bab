module.exports = {
  getFormatDate1: (rawDate) => {
    var year = rawDate.getFullYear();
    var month = ("0" + (1 + rawDate.getMonth())).slice(-2);
    var day = ("0" + rawDate.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  },

  getFormatDate2: (rawDate) => {
    var year = rawDate.getFullYear();
    var month = (1 + rawDate.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = rawDate.getDate();
    day = day >= 10 ? day : '0' + day;
    return  year + '-' + month + '-' + day;
}


}

