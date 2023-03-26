function sortArray(array) {
    let index = []
    let odd = []
    for(let i=0; i<array.length; i++)
      {
        if(array[i]%2!==0)
          {
            odd.push(array[i])
            index.push(i)
          }
      }
    odd.sort(function(a, b){return a - b});
    console.log(odd)
    console.log(index)
    for(let i=0; i<odd.length; i++)
      {
        array.splice(index[i], 1, odd[i])
      }
    return array
  }