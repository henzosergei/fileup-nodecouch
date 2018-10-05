const dbName = 'hw_0_ram';
const convert = require('./convert');
var fs =require("fs"); 

exports.com_Add = function (couch, req, res, form) {
    //fordoc
    var now = new Date();
    const newcom = "some text";
    var date = convert.conv_date(now, "T");
    var timestamp = '{"user":"admin","moment":"' + date + '","e1cib": "true"}';
    timestamp = JSON.parse(timestamp);
    var datenoT = convert.conv_date(now, " ");
    var Appeal = "Appeal from " + datenoT;
    var id;

     //forfile
     var f_file;
     form.parse(req, function (err, fields, files) {
         if (err) {
             console.error(err);
         } else {
             f_file = files.file;
         }
         console.log(files.file);
         console.log("files===============================================");
         couch.uniqid().then(function (ids) {
            console.log("Add New Comments");
            id = "" + ids[0];
            var idnew = "Appeal|" + convert.conv_id(id);
            //console.log(req.body);
            couch.insert(dbName, {
                _id: idnew,
                com: newcom,
                change_date: date,
                appeal: Appeal,
                timestamp: timestamp
            }).then(
                couch.insertAttachment(dbName, id, "ff.name", f_file, "1").then(
                    function (data, headers, status) {
                        console.log("Add New Comments - ok");
                        res.render('index');
                    },
                    function (err) {
                        res.send(err);
                    }
                ));
        });
     });
 
     
 };

/*
    form.parse(req);

    //upload file to server????????????
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });

    //file on server - ok??????????????????????
    form.on('file', function (name, file) {
        //console.log(file);
        //console.log(file.path);
        //console.log('Uploaded ' + file.name);
        var data= fs.readFileSync(file.path);
        console.log(data);
        // = file.path + file.name;
        couch.uniqid().then(function (ids) {
            console.log("Add New Comments");
            id = "" + ids[0];
            var idnew = "Appeal|" + convert.conv_id(id);
            couch.insert(dbName, {
                _id: idnew,
                com: newcom,
                change_date: date,
                appeal: Appeal,
                timestamp: timestamp
            }).then(
                couch.insertAttachment(dbName, "Appeal|65199976-6d32-aac6-0495-a119fd09e5b2", file.name, data.body, "1").then(
                    function (data, headers, status) {
                        console.log("Add New Comments - ok");
                        console.log(file.body);
                        res.render('index');
                    },
                    function (err) {
                        res.send(err);
                    }
                ));
        });
    });
};
*/  