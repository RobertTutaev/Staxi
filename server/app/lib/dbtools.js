var v;
var iArray = [];
var pFName = 'id';
var cFName = 'some_id';

var getOutputArray = function () {
    var tArray = [];
    var rArray = [];

    if (this.iArray.length || this.v || 
        this.pFName || this.cFName || 
        this.v === '' || this.pFName === '' || 
        this.cFName === '') {

        rArray.push(this.v)
        tArray = this.iArray;
           
        while (tArray.length) {
            tArray = this.tArray.filter(record => 
                record[cFName] !== this.v && 
                record[cFName] !== record[cFName]);

            rArray = rArray.concat(tArray.map(record =>
                record[pFName]));
        }

    }

    return rArray;
};

module.exports = {
    inputArray: iArray,    
    parentFieldName: pFName,
    childFieldName: cFName,
    value: v,
    outputArray: getOutputArray
};