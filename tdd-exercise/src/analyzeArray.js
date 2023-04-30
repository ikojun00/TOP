function analyzeArray(array)
{
    let sum = 0, min = Infinity, max = -Infinity;
    if (typeof array !== 'object') return 'invalid input';

    for (let i = 0; i < array.length; i += 1) 
    {
        if (typeof array[i] !== 'number') return 'non number inside array';
        sum += array[i];
        if(min > array[i]) min = array[i];
        if(max < array[i]) max = array[i];
    }
    
    return {
        average: sum / array.length,
        min: min,
        max: max,
        length: array.length,
    };
}

module.exports = analyzeArray;