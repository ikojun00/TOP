function fibs(n)
{
    let array = [];
    for(let i=0; i<n; i++)
    {
        if(i<2) array.push(i);
        else array.push(array[i-1]+array[i-2]);
    }
    return array;
}

console.log(fibs(8));

function fibsRec(n, array = [0, 1])
{
    if((array.length >= n)) return array;
    return fibsRec(n, array.concat([array[array.length - 2] + array[array.length - 1]]));
}

console.log(fibsRec(8));