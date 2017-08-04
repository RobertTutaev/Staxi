var models = require('../models');
var XlsxPopulate = require('xlsx-populate');
var moment = require('moment');
var async = require('async');

moment.locale('ru-RU');

var getInfoModelValues = function(modelName, id, callback) {

    if(!id) return callback(null, null);

    models[modelName].findById(parseInt(id))
    .then(
        function(value, err) {
            return callback(null, value);
        }, 
        function(err) {
            return callback(err, null);
        }
    );

}

var getInfo = function(firmId, statusId, clientId, myCallback) {

    async.parallel([
            // firm
            function(callback){
                getInfoModelValues('firm', firmId, callback);
            },
            // Status
            function(callback){
                getInfoModelValues('status', statusId, callback);
            },
            // Client
            function(callback){
               getInfoModelValues('client', clientId, callback);
            }
        ],
        function(err, values){
            return myCallback(err, values);
        }
    );

}

var getA = function(values, user, firmId, aDt, bDt, statusId, withChilds, res){

    getInfo(
        firmId,
        statusId,
        0,
        function(err, result) {
            
            if (!err)
                XlsxPopulate.fromFileAsync('./app/templates/report_a.xlsx')
                .then(workbook => {                                        
                    var wSheet = workbook.sheet(0);
                    var dt = new Date();
                    
                    wSheet.row(2).cell(1).value(result[0].name);
                    wSheet.row(3).cell(1).value(`[ Период: ${moment(aDt).format('DD.MM.YYYY')} - ${moment(bDt).format('DD.MM.YYYY')}; отбор: ${ withChilds ? 'с подчин. орган.' : 'без подчин. орган.' }; статус: ${result[1].name}; сформирован: ${moment(dt).format('DD.MM.YYYY hh:mm:ss')} ]`);

                    values.forEach((v, i) => {
                        var j = 1;
                        wSheet.row(i+5).cell(j++).value(v.id);
                        wSheet.row(i+5).cell(j++).value(v.firm);
                        wSheet.row(i+5).cell(j++).value(v.car);
                        wSheet.row(i+5).cell(j++).value(v.a_dt).style("numberFormat", "dd.mm.yyyy hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.b_dt).style("numberFormat", "hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.a_adr);
                        wSheet.row(i+5).cell(j++).value(v.b_adr);
                        wSheet.row(i+5).cell(j++).value(v.client);
                    });

                    wSheet.range(5, 1, 4 + values.length, 8).style({border: true});

                    wSheet.range(6 + values.length, 1, 6 + values.length, 8).merged(true);
                    wSheet.row(6 + values.length).cell(1).style({horizontalAlignment : 'left'});
                    wSheet.row(6 + values.length).cell(1).value(`Пользователь: ${user.first_name} ${user.last_name}`);
                                                                  
                    return workbook.outputAsync();
                })
                .then(data => {
                    var dt= new Date();
                    res.attachment(`output.xlsx`);                      
                    
                    res.send(data);
                });              
        }
    );

}

var getC = function(values, user, carId, aDt, statusId, res){

    getInfo(
        firmId,
        statusId,
        0,
        function(err, result) {
            
            if (!err)
                XlsxPopulate.fromFileAsync('./app/templates/report_c.xlsx')
                .then(workbook => {                                        
                    var wSheet = workbook.sheet(0);
                    var dt = new Date();
                    
                    wSheet.row(2).cell(1).value(result[0].name);
                    wSheet.row(3).cell(1).value(`[ Период: ${moment(aDt).format('DD.MM.YYYY')} - ${moment(bDt).format('DD.MM.YYYY')}; отбор: ${ withChilds ? 'с подчин. орган.' : 'без подчин. орган.' }; статус: ${result[1].name}; сформирован: ${moment(dt).format('DD.MM.YYYY hh:mm:ss')} ]`);

                    values.forEach((v, i) => {
                        var j = 1;
                        wSheet.row(i+5).cell(j++).value(v.id);
                        wSheet.row(i+5).cell(j++).value(v.firm);
                        wSheet.row(i+5).cell(j++).value(v.car);
                        wSheet.row(i+5).cell(j++).value(v.a_dt).style("numberFormat", "dd.mm.yyyy hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.b_dt).style("numberFormat", "hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.a_adr);
                        wSheet.row(i+5).cell(j++).value(v.b_adr);
                        wSheet.row(i+5).cell(j++).value(v.client);
                    });

                    wSheet.range(5, 1, 4 + values.length, 8).style({border: true});

                    wSheet.range(6 + values.length, 1, 6 + values.length, 8).merged(true);
                    wSheet.row(6 + values.length).cell(1).style({horizontalAlignment : 'left'});
                    wSheet.row(6 + values.length).cell(1).value(`Пользователь: ${user.first_name} ${user.last_name}`);
                                                                  
                    return workbook.outputAsync();
                })
                .then(data => {
                    var dt= new Date();
                    res.attachment(`output.xlsx`);                      
                    
                    res.send(data);
                });                    
        }
    );

}

var getB = function(values, user, firmId, aYear, aMonth, withChilds, res){

    getInfo(
        firmId,
        0,
        0,
        function(err, result) {

            if (!err)
                XlsxPopulate.fromFileAsync('./app/templates/report_b.xlsx')
                .then(workbook => {                    
                    var wSheet = workbook.sheet(0);
                    var dt = new Date();
                    var dtReport = new Date(aYear, aMonth-1, 1)
                    
                    wSheet.row(2).cell(1).value(result[0].name);
                    wSheet.row(3).cell(1).value(`[ Период: ${moment(dtReport).format('MMMM')} ${moment(dtReport).format('YYYY')} г.; отбор: ${ withChilds ? 'с подчин. орган.' : 'без подчин. орган.' }; сформирован: ${moment(dt).format('DD.MM.YYYY hh:mm:ss')} ]`);

                    values.forEach((v, i) => {
                        var j = 1;
                        wSheet.row(i+6).cell(j++).value(v.n);
                        wSheet.row(i+6).cell(j++).value(v.name);
                        wSheet.row(i+6).cell(j++).value(v.i0);
                        wSheet.row(i+6).cell(j++).value(v.i1);
                        wSheet.row(i+6).cell(j++).value(v.i2);
                        wSheet.row(i+6).cell(j++).value(v.i3);

                        if (!(v.n % 100)) wSheet.range(i+6, 1, i+6, 6).style({bold: true});
                    });

                    wSheet.range(6, 1, 5 + values.length, 6).style({border: true});

                    wSheet.range(7 + values.length, 1, 7 + values.length, 6).merged(true);
                    wSheet.row(7 + values.length).cell(1).style({horizontalAlignment : 'left'});
                    wSheet.row(7 + values.length).cell(1).value(`Пользователь: ${user.first_name} ${user.last_name}`); 

                    return workbook.outputAsync();
                })
                .then(data => {
                    var dt= new Date();
                    res.attachment(`output.xlsx`);                      
                    
                    res.send(data);
                });                    
        }
    );

}

var getT = function(values, user, clientId, res){

    getInfo(
        0,
        0,
        clientId,
        function(err, result) {
    
            if (!err)
                XlsxPopulate.fromFileAsync('./app/templates/report_t.xlsx')
                .then(workbook => {                    
                    var wSheet = workbook.sheet(0);
                    var dt = new Date();
                    
                    wSheet.row(2).cell(1).value(`СНИЛС: ${result[2].snils}; Имя Отчество: ${result[2].im} ${result[2].ot}`);
                    wSheet.row(3).cell(1).value(`[ ID: ${result[2].id}; сформирован: ${moment(dt).format('DD.MM.YYYY hh:mm:ss')} ]`);

                    values.forEach((v, i) => {
                        var j = 1;
                        wSheet.row(i+5).cell(j++).value(i+1);
                        wSheet.row(i+5).cell(j++).value(v.id);
                        wSheet.row(i+5).cell(j++).value(v.punkt);
                        wSheet.row(i+5).cell(j++).value(v.a_adr);
                        wSheet.row(i+5).cell(j++).value(v.b_adr);
                        wSheet.row(i+5).cell(j++).value(v.car);
                        wSheet.row(i+5).cell(j++).value(v.a_dt).style("numberFormat", "dd.mm.yyyy hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.b_dt).style("numberFormat", "hh:MM");
                        wSheet.row(i+5).cell(j++).value(v.comment);
                        wSheet.row(i+5).cell(j++).value(v.status);
                        wSheet.row(i+5).cell(j++).value(v.user);
                    });

                    wSheet.range(4, 1, 4 + values.length, 11).style({border: true});

                    wSheet.range(6 + values.length, 1, 6 + values.length, 11).merged(true);
                    wSheet.row(6 + values.length).cell(1).style({horizontalAlignment : 'left'});
                    wSheet.row(6 + values.length).cell(1).value(`Пользователь: ${user.first_name} ${user.last_name}`); 

                    return workbook.outputAsync();
                })
                .then(data => {
                    var dt= new Date();
                    res.attachment(`output.xlsx`);                      
                    
                    res.send(data);
                });
        }
    );

}

module.exports = {
    getInfo: getInfo,
    getA: getA,
    getB: getB,
    getC: getC,
    getT: getT
};