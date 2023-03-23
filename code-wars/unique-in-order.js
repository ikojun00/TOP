var uniqueInOrder=function(iterable){
  let i=1
  let a=[];
  while(i<=iterable.length)
    {
      if(iterable[i]!==iterable[i-1])
        {
          a.push(iterable[i-1])
        }
      i++;
    }
  return a;
}