/*
Task
You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

Examples
[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]
*/

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