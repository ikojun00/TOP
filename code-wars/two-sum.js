function twoSum(numbers, target) {
    for(i=0; i<numbers.length-1; i++)
      {
        for(j=1; j<numbers.length; j++)
          {
            if(numbers[i]+numbers[j]===target)
              return [i, j];
          }
      }
    return 0
  }