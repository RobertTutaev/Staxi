var models = require('../models');
var XlsxPopulate = require('xlsx-populate');
var moment = require('moment');

moment.locale('ru-RU');

const constReport0 = 'Пользователь: ';
const constReport1 = 'Телефон: ';

var getInfo = function(firmId, statusId, clientId, carId, XLSXFileName) {

    var getModelValues = function(modelName, id) {
        return models[modelName].findById( parseInt(id) );
    }
    
    var getCarValues = function(id) {    
        var sql = 
            `SELECT 
                a.*, 
                b.name as firm,
                concat(c.first_name,' ',c.last_name) as user,
                c.phone
            FROM car a 
                join firm b on a.firm_id = b.id
                join user c on a.user_id = c.id
            WHERE
                a.id = :id`;
        
        return models.sequelize.query(
                    sql, 
                    { 
                        replacements: { id: parseInt(id) }, 
                        type: models.sequelize.QueryTypes.SELECT 
                    });
    }
    
    var getExcelWorkbook = function(XLSXFileName) {
        if (!!XLSXFileName)
            return XlsxPopulate.fromFileAsync(XLSXFileName);
        else
            return Promise.resolve(null);
    }

    return Promise.all([
            getModelValues('firm', firmId),
            getModelValues('status', statusId),
            getModelValues('client', clientId),
            getCarValues(carId),
            getExcelWorkbook(XLSXFileName)
        ]);
}

var getA = function(values, user, firmId, aDt, bDt, statusId, withChilds, res) {
    
    getInfo(
            firmId,
            statusId,
            0,
            0,
            './app/templates/report_a.xlsx'
        )
        .then((result) => {
            var wSheet = result[4].sheet(0);
            var dt = new Date();
            wSheet.row(2).cell(1).value(result.name);
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
            wSheet.row(6 + values.length).cell(1).value(`${constReport0}${user.first_name} ${user.last_name}`);

            wSheet.range(7 + values.length, 1, 7 + values.length, 8).merged(true);
            wSheet.row(7 + values.length).cell(1).style({horizontalAlignment : 'left'});
            wSheet.row(7 + values.length).cell(1).value(`${constReport1}${user.phone}`);
                                                            
            return result[4].outputAsync();
        })
        .then((data) => {
            var dt= new Date();
            res.attachment(`output.xlsx`);                      
            
            res.send(data);
        });              
}

var getB = function(values, user, firmId, aYear, aMonth, withChilds, res){

    getInfo(
            firmId,
            0,
            0,
            0,
            './app/templates/report_b.xlsx'
        )
        .then((result) => {                                    
            var wSheet = result[4].sheet(0);
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
            wSheet.row(7 + values.length).cell(1).value(`${constReport0}${user.first_name} ${user.last_name}`);

            wSheet.range(8 + values.length, 1, 8 + values.length, 6).merged(true);
            wSheet.row(8 + values.length).cell(1).style({horizontalAlignment : 'left'});
            wSheet.row(8 + values.length).cell(1).value(`${constReport1}${user.phone}`);

            return result[4].outputAsync();
        })
        .then(data => {
            var dt= new Date();
            res.attachment(`output.xlsx`);                      
            
            res.send(data);
        });
}

var getC = function(values, user, carId, aDt, res){

    getInfo(
            0,
            0,
            0,
            carId,
            './app/templates/report_c.xlsx'
        ).
        then((result) => {                                        
            var wSheet = result[4].sheet(0);
            var dt = new Date();
            
            wSheet.row(2).cell(1).value(`${result[3].name}; гос. номер: ${result[3].gos_no}; дата: ${moment(aDt).format('DD.MM.YYYY')}`);
            wSheet.row(3).cell(1).value(`[ Водитель: ${result[3].user}; цвет: ${result[3].color}; телефон: ${result[3].phone}; сформирован: ${moment(dt).format('DD.MM.YYYY hh:mm:ss')} ]`);

            values.forEach((v, i) => {
                var j = 1;
                wSheet.row(i+6).cell(j++).value(v.dt);
                wSheet.row(i+6).cell(j++).value(v.a_adr);
                wSheet.row(i+6).cell(j++).value(v.b_adr);
                wSheet.row(i+6).cell(j++).value(v.client_name);
                wSheet.row(i+6).cell(j++).value(v.client_contact);
                wSheet.row(i+6).cell(j++).value(v.client_info);
            });

            wSheet.range(6, 1, 5 + values.length, 6).style({border: true});

            wSheet.range(7 + values.length, 1, 7 + values.length, 6).merged(true);
            wSheet.row(7 + values.length).cell(1).style({horizontalAlignment : 'left'});
            wSheet.row(7 + values.length).cell(1).value(`${constReport0}${user.first_name} ${user.last_name}`);

            wSheet.range(8 + values.length, 1, 8 + values.length, 6).merged(true);
            wSheet.row(8 + values.length).cell(1).style({horizontalAlignment : 'left'});
            wSheet.row(8 + values.length).cell(1).value(`${constReport1}${user.phone}`);
                                                            
            return result[4].outputAsync();
        })
        .then(data => {
            var dt= new Date();
            res.attachment(`output.xlsx`);                      
            
            res.send(data);
        });
}

var getT = function(values, user, clientId, res){

    getInfo(
            0,
            0,
            clientId,
            0,
            './app/templates/report_t.xlsx'
        ).
        then((result) => {                    
            var wSheet = result[4].sheet(0);
            var dt = new Date();
            
            wSheet.row(2).cell(1).value(`СНИЛС: ${result[2].snils}; Ф. Имя Отчество: ${result[2].fam} ${result[2].im} ${result[2].ot ? result[2].ot : ''}`);
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
            wSheet.row(6 + values.length).cell(1).value(`${constReport0}${user.first_name} ${user.last_name}`);

            wSheet.range(7 + values.length, 1, 7 + values.length, 11).merged(true);
            wSheet.row(7 + values.length).cell(1).style({horizontalAlignment : 'left'});
            wSheet.row(7 + values.length).cell(1).value(`${constReport1}${user.phone}`);


            return result[4].outputAsync();
        })
        .then(data => {
            var dt= new Date();
            res.attachment(`output.xlsx`);                      
            
            res.send(data);
        });
}

module.exports = {
    getA: getA,
    getB: getB,
    getC: getC,
    getT: getT
};