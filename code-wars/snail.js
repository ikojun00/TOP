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