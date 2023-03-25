function moveZeros(arr) {
    let a=[]
    for(let i=0; i<arr.length; i++)
      {
        if(arr[i]===0)
          {
            a.push(arr[i])
            arr.splice(i, 1);
            i--
          }
      }
    arr.push(...a)
    return arr;
  }