/*
Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
*/
snail = function(array) {
  let final = []
  while(array.length){
    final.push(...array.shift())
    for (let i = 0; i < array.length; i++){
      final.push(array[i].pop())
    }
    final.push(...(array.pop() || []).reverse())
    for (let i = array.length -1; i >= 0; i--){
      final.push(array[i].shift())
    }
  }
  return final
}