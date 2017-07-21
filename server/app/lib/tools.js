var getOutputArray = function(opt) {
    // 1. Подготовительные действия
    var outputArray = [];
    var tempArray = [];

    // 2. Проверка передаваемых данных
    if (typeof opt === 'object' &&                  // Параметры являються объектом
        opt.hasOwnProperty('inputArray') &&         // Есть свойство inputArray
        Array.isArray(opt.inputArray) &&            // Свойство inputArray - массив
        opt.inputArray.length &&                    // Массив не нулевой
        opt.hasOwnProperty('searchValue') &&        // Есть свойство searchValue
        opt.searchValue &&                          // Определено значение для поиска
        opt.hasOwnProperty('parentFieldName') &&    // Есть свойство parentFieldName
        opt.parentFieldName &&                      // Определено название родительского поля (обычно ID)
        typeof opt.parentFieldName === 'string' &&  // Родительское поле содержит текст
        opt.hasOwnProperty('childFieldName') &&     // Есть свойство childFieldName
        opt.childFieldName &&                       // Определено название зависимого поля
        typeof opt.childFieldName === 'string')  {  // Зависимое поле содержит текст

        // 3. Обработка данных и формирование результата
        outputArray.push(opt.searchValue);
        for (var i = 0; i < outputArray.length; i++) {
            
            tempArray = opt.inputArray.filter(filterRecord =>
                filterRecord[opt.parentFieldName] !== outputArray[i] && 
                filterRecord[opt.childFieldName] === outputArray[i]
            );

            outputArray = outputArray.concat(tempArray.map(mapRecord =>
                mapRecord[opt.parentFieldName]));
        };
    }

    // 4. Возвращение результата
    return outputArray;
};

module.exports = {
    getOutputArray: getOutputArray
}