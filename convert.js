exports.conv_id = function(id){
    var newid;
    newid = id.substring(0,8) + "-" +
            id.substring(8,12) + "-" +
            id.substring(12,16) + "-" +
            id.substring(16,20) + "-" +
            id.substring(20,id.length);
    return newid;
};

exports.conv_date = function(now,sep){
    var mouth = "" + (now.getMonth()+1);
    var daydate = "" + now.getDate();
    var hours = "" + now.getHours();
    var minutes = "" + now.getMinutes();
    var seconds = "" + now.getSeconds();
    var needFormat;
    if (mouth.length == 1){
        mouth = "0" + mouth;
    };
    if (daydate.length == 1){
        daydate = "0" + daydate;
    };
    if (hours.length == 1){
        hours = "0" + hours;
    };
    if (minutes.length == 1){
        minutes = "0" + minutes;
    };
    if (seconds.length == 1){
        seconds = "0" + seconds;
    };
    needFormat = now.getFullYear() + "-" +
                 mouth + "-" + 
                 daydate + sep +
                 hours + ":" +
                 minutes + ":" +
                 seconds;
    return needFormat;
};
